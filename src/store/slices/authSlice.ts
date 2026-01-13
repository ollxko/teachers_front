import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import {
  authApi,
  type LoginCredentials,
  type RegisterData,
  type AuthResponse,
} from '../../api/authApi';
import { parseJwt } from '../../utils/jwtUtils';

export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  refreshTimerId: NodeJS.Timeout | null;
}

// Функция для извлечения пользователя из токена
const getUserFromToken = (token: string | null): User | null => {
  if (!token) return null;

  const decoded = parseJwt(token);
  if (!decoded) return null;

  try {
    // Проверяем, есть ли context поле с JSON строкой
    let contextData = null;
    if (decoded.context) {
      contextData =
        typeof decoded.context === 'string' ? JSON.parse(decoded.context) : decoded.context;
    }

    // Проверяем поле roles - может быть массивом или JSON строкой
    let roles: string[] = [];
    if (decoded.roles) {
      if (typeof decoded.roles === 'string') {
        try {
          roles = JSON.parse(decoded.roles);
        } catch {
          // Если не JSON, возможно это просто строка с ролями
          roles = decoded.roles.split(',').map((r: string) => r.trim());
        }
      } else if (Array.isArray(decoded.roles)) {
        roles = decoded.roles;
      }
    }

    // Проверяем альтернативное поле ролей
    if (
      roles.length === 0 &&
      decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    ) {
      const roleClaim = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      if (Array.isArray(roleClaim)) {
        roles = roleClaim;
      } else {
        roles = [roleClaim];
      }
    }

    return {
      id: contextData?.id || decoded.sub || decoded.id || '',
      username:
        contextData?.username ||
        decoded.username ||
        decoded.name ||
        decoded.preferred_username ||
        '',
      email: contextData?.email || decoded.email || '',
      roles: roles.filter((role: string) => role !== 'logged_in'), // Фильтруем logged_in если нужно
    };
  } catch (error) {
    console.error('Error parsing user from token:', error);
    return null;
  }
};

// Функция для инициализации состояния из localStorage
const getInitialState = (): AuthState => {
  const token = localStorage.getItem('access_token');
  const userFromToken = getUserFromToken(token);

  // Проверяем, не истек ли токен
  if (token && userFromToken) {
    const decoded = parseJwt(token);
    const isExpired = decoded?.exp ? decoded.exp * 1000 < Date.now() : false;

    if (isExpired) {
      // Если токен истек, очищаем localStorage
      localStorage.removeItem('access_token');
      return initialState;
    }
  }

  return {
    user: userFromToken,
    token,
    isAuthenticated: !!token && !!userFromToken,
    isLoading: false,
    error: null,
    refreshTimerId: null,
  };
};

const initialState: AuthState = getInitialState();

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка входа');
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await authApi.refreshToken();
      const newToken = response.data.access_token;

      // После успешного обновления, запускаем таймер для следующего обновления
      dispatch(scheduleTokenRefresh(newToken));

      return response.data;
    } catch (error: any) {
      localStorage.removeItem('access_token');
      return rejectWithValue(error.response?.data?.message || 'Ошибка обновления токена');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const response = await authApi.register(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка регистрации');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  try {
    await authApi.logout();
  } finally {
    // Всегда очищаем таймер и состояние
    dispatch(clearRefreshTimer());
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.user = getUserFromToken(action.payload);
      state.isAuthenticated = true;
      localStorage.setItem('access_token', action.payload);
    },
    // Дополнительный reducer для обновления данных пользователя из токена
    updateUserFromToken: state => {
      if (state.token) {
        state.user = getUserFromToken(state.token);
      }
    },
    // Проверка срока действия токена
    checkTokenExpiration: state => {
      if (state.token) {
        const decoded = parseJwt(state.token);
        const isExpired = decoded?.exp ? decoded.exp * 1000 < Date.now() : false;

        if (isExpired) {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
          localStorage.removeItem('access_token');
        }
      }
    },
    // Установка таймера для обновления токена
    setRefreshTimer: (state, action: PayloadAction<NodeJS.Timeout>) => {
      // Очищаем предыдущий таймер если есть
      if (state.refreshTimerId) {
        clearTimeout(state.refreshTimerId);
      }
      state.refreshTimerId = action.payload;
    },
    // Очистка таймера
    clearRefreshTimer: state => {
      if (state.refreshTimerId) {
        clearTimeout(state.refreshTimerId);
        state.refreshTimerId = null;
      }
    },
    // Запуск таймера для обновления токена (используется внутри thunk)
    scheduleTokenRefresh: {
      reducer: () => {},
      prepare: (token: string) => {
        const decoded = parseJwt(token);
        if (!decoded?.exp) return { payload: null };

        const expiresAt = decoded.exp * 1000;
        const now = Date.now();
        const timeToExpire = expiresAt - now;

        // Обновляем за 9 минут до истечения (540000 мс)
        const refreshDelay = Math.max(timeToExpire - 9 * 60 * 1000, 1000);

        const timerId = setTimeout(() => {
          // Это будет обработано в middleware или отдельном хуке
        }, refreshDelay);

        return { payload: timerId };
      },
    },
  },
  extraReducers: builder => {
    builder
      // Login
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.token = action.payload.access_token;
        state.user = getUserFromToken(action.payload.access_token);
        state.isAuthenticated = true;

        // Сохраняем в localStorage
        localStorage.setItem('access_token', action.payload.access_token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Register
      .addCase(register.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.token = action.payload.access_token;
        state.user = getUserFromToken(action.payload.access_token);
        state.isAuthenticated = true;

        localStorage.setItem('access_token', action.payload.access_token);
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Logout
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('access_token');
      })
      .addCase(logout.rejected, state => {
        // Даже если запрос на сервер не удался, очищаем локальное состояние
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('access_token');
      })

      // Refresh Token
      .addCase(refreshToken.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action: PayloadAction<{ access_token: string }>) => {
        state.isLoading = false;
        state.token = action.payload.access_token;
        state.user = getUserFromToken(action.payload.access_token);
        localStorage.setItem('access_token', action.payload.access_token);
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('access_token');
      });
  },
});

export const {
  clearError,
  setToken,
  updateUserFromToken,
  checkTokenExpiration,
  setRefreshTimer,
  clearRefreshTimer,
  scheduleTokenRefresh,
} = authSlice.actions;

// Селекторы
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectIsLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectRefreshTimerId = (state: { auth: AuthState }) => state.auth.refreshTimerId;

// Хелперы для проверки ролей
export const hasRole = (user: User | null, role: string): boolean => {
  return user?.roles.includes(role) || false;
};

export const hasAnyRole = (user: User | null, roles: string[]): boolean => {
  return roles.some(role => user?.roles.includes(role)) || false;
};

export const hasAllRoles = (user: User | null, roles: string[]): boolean => {
  return roles.every(role => user?.roles.includes(role)) || false;
};

// Хелпер для получения userId из токена
export const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem('access_token');
  if (!token) return null;
  const decoded = parseJwt(token);
  return decoded?.sub || decoded?.id || null;
};

// Хелпер для получения времени истечения токена
export const getTokenExpirationTime = (): number | null => {
  const token = localStorage.getItem('access_token');
  if (!token) return null;
  const decoded = parseJwt(token);
  return decoded?.exp ? decoded.exp * 1000 : null;
};

// Хелпер для проверки, нужно ли обновлять токен
export const shouldRefreshToken = (): boolean => {
  const token = localStorage.getItem('access_token');
  if (!token) return false;

  const decoded = parseJwt(token);
  if (!decoded?.exp) return false;

  const expiresAt = decoded.exp * 1000;
  const now = Date.now();
  const timeToExpire = expiresAt - now;

  // Обновляем если до истечения осталось меньше 9 минут
  return timeToExpire < 9 * 60 * 1000;
};

export default authSlice.reducer;
