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

const getUserFromToken = (token: string | null): User | null => {
  if (!token) return null;

  const decoded = parseJwt(token);
  if (!decoded) return null;

  try {
    let contextData = null;
    if (decoded.context) {
      contextData =
        typeof decoded.context === 'string' ? JSON.parse(decoded.context) : decoded.context;
    }

    let roles: string[] = [];
    if (decoded.roles) {
      if (typeof decoded.roles === 'string') {
        try {
          roles = JSON.parse(decoded.roles);
        } catch {
          roles = decoded.roles.split(',').map((r: string) => r.trim());
        }
      } else if (Array.isArray(decoded.roles)) {
        roles = decoded.roles;
      }
    }

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
      roles: roles.filter((role: string) => role !== 'logged_in'),
    };
  } catch (error) {
    console.error('Error parsing user from token:', error);
    return null;
  }
};

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  refreshTimerId: null,
};

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

      dispatch(scheduleTokenRefresh(newToken));

      return response.data;
    } catch (error: any) {
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
    dispatch(clearRefreshTimer());
  }
});

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await authApi.refreshToken();
      return response.data;
    } catch (error: any) {
      console.log('No valid session on app start');
      return rejectWithValue('Сессия истекла');
    }
  }
);

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
    },
    updateUserFromToken: state => {
      if (state.token) {
        state.user = getUserFromToken(state.token);
      }
    },
    checkTokenExpiration: state => {
      if (state.token) {
        const decoded = parseJwt(state.token);
        const isExpired = decoded?.exp ? decoded.exp * 1000 < Date.now() : false;

        if (isExpired) {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
        }
      }
    },
    setRefreshTimer: (state, action: PayloadAction<NodeJS.Timeout>) => {
      if (state.refreshTimerId) {
        clearTimeout(state.refreshTimerId);
      }
      state.refreshTimerId = action.payload;
    },
    clearRefreshTimer: state => {
      if (state.refreshTimerId) {
        clearTimeout(state.refreshTimerId);
        state.refreshTimerId = null;
      }
    },
    scheduleTokenRefresh: {
      reducer: (state, action: PayloadAction<NodeJS.Timeout | null>) => {
        if (action.payload) {
          if (state.refreshTimerId) {
            clearTimeout(state.refreshTimerId);
          }
          state.refreshTimerId = action.payload;
        }
      },
      prepare: (token: string) => {
        const decoded = parseJwt(token);
        if (!decoded?.exp) return { payload: null };

        const expiresAt = decoded.exp * 1000;
        const now = Date.now();
        const timeToExpire = expiresAt - now;

        const refreshDelay = Math.max(timeToExpire - 9 * 60 * 1000, 1000);

        const timerId = setTimeout(() => {}, refreshDelay);

        return { payload: timerId };
      },
    },

    resetAuthState: state => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = false;
      if (state.refreshTimerId) {
        clearTimeout(state.refreshTimerId);
        state.refreshTimerId = null;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initializeAuth.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        initializeAuth.fulfilled,
        (state, action: PayloadAction<{ access_token: string }>) => {
          state.isLoading = false;
          state.token = action.payload.access_token;
          state.user = getUserFromToken(action.payload.access_token);
          state.isAuthenticated = true;
        }
      )
      .addCase(initializeAuth.rejected, state => {
        state.isLoading = false;
      })

      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.token = action.payload.access_token;
        state.user = getUserFromToken(action.payload.access_token);
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(register.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.token = action.payload.access_token;
        state.user = getUserFromToken(action.payload.access_token);
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, state => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })

      .addCase(refreshToken.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action: PayloadAction<{ access_token: string }>) => {
        state.isLoading = false;
        state.token = action.payload.access_token;
        state.user = getUserFromToken(action.payload.access_token);
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
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
  resetAuthState,
} = authSlice.actions;

export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectIsLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectRefreshTimerId = (state: { auth: AuthState }) => state.auth.refreshTimerId;

export const hasRole = (user: User | null, role: string): boolean => {
  return user?.roles.includes(role) || false;
};

export const hasAnyRole = (user: User | null, roles: string[]): boolean => {
  return roles.some(role => user?.roles.includes(role)) || false;
};

export const hasAllRoles = (user: User | null, roles: string[]): boolean => {
  return roles.every(role => user?.roles.includes(role)) || false;
};

export const shouldRefreshToken = (state: { auth: AuthState }): boolean => {
  const token = state.auth.token;
  if (!token) return false;

  const decoded = parseJwt(token);
  if (!decoded?.exp) return false;

  const expiresAt = decoded.exp * 1000;
  const now = Date.now();
  const timeToExpire = expiresAt - now;

  return timeToExpire < 9 * 60 * 1000;
};

export default authSlice.reducer;
