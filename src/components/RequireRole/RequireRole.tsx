import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser, hasAnyRole } from '../../store/slices/authSlice';

interface RequireRoleProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallbackPath: string;
}

export const RequireRole: React.FC<RequireRoleProps> = ({
  children,
  allowedRoles,
  fallbackPath,
}) => {
  const user = useSelector(selectCurrentUser);

  // Проверяем, есть ли у пользователя нужные роли
  const hasRequiredRole = hasAnyRole(user, allowedRoles);

  if (!hasRequiredRole) {
    // Перенаправляем на указанный путь
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};
