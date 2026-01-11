import { useSelector, useDispatch } from 'react-redux';
import {
  selectCurrentUser,
  selectIsAuthenticated,
  selectIsLoading,
  selectError,
  hasRole,
  hasAnyRole,
  hasAllRoles,
  login,
  logout,
  register,
  clearError,
} from '../store/slices/authSlice';
import { type AppDispatch } from '../store/store';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,

    hasRole: (role: string) => hasRole(user, role),
    hasAnyRole: (roles: string[]) => hasAnyRole(user, roles),
    hasAllRoles: (roles: string[]) => hasAllRoles(user, roles),

    login: (credentials: { username: string; password: string }) => dispatch(login(credentials)),
    logout: () => dispatch(logout()),
    register: (data: any) => dispatch(register(data)),
    clearError: () => dispatch(clearError()),

    isAdmin: hasRole(user, 'admin'),
    isSuperAdmin: hasRole(user, 'superadmin'),
    isUser: hasRole(user, 'user'),
  };
};
