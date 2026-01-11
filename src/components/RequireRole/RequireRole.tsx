// components/RequireRole.tsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser, hasAnyRole } from '../../store/slices/authSlice';
import type { JSX } from 'react';

interface RequireRoleProps {
  children: JSX.Element;
  allowedRoles: string[];
  fallbackPath?: string;
}

export const RequireRole = ({
  children,
  allowedRoles,
  fallbackPath = '/unauthorized',
}: RequireRoleProps) => {
  const user = useSelector(selectCurrentUser);

  if (!hasAnyRole(user, allowedRoles)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
};
