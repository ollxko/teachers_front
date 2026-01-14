import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch } from '../../store/store';
import {
  selectToken,
  selectIsAuthenticated,
  refreshToken,
  clearRefreshTimer,
} from '../../store/slices/authSlice';
import { parseJwt } from '../../utils/jwtUtils';

export const useAutoRefreshToken = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scheduleTokenRefresh = (currentToken: string) => {
    const decoded = parseJwt(currentToken);
    if (!decoded?.exp) return;

    const expiresAt = decoded.exp * 1000;
    const now = Date.now();
    const timeToExpire = expiresAt - now;

    const refreshDelay = Math.max(timeToExpire - 9 * 60 * 1000, 1000);

    console.log(`Token will refresh in ${Math.round(refreshDelay / 1000 / 60)} minutes`);

    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
    }

    refreshTimerRef.current = setTimeout(() => {
      console.log('Auto-refreshing token...');
      dispatch(refreshToken());
    }, refreshDelay);
  };

  useEffect(() => {
    if (isAuthenticated && token) {
      scheduleTokenRefresh(token);
    }

    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }
      dispatch(clearRefreshTimer());
    };
  }, [token, isAuthenticated, dispatch]);

  return null;
};
