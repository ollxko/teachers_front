// hooks/useAutoRefreshToken.ts
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

    // Обновляем за 9 минут до истечения (540000 мс)
    const refreshDelay = Math.max(timeToExpire - 9 * 60 * 1000, 1000);

    console.log(`Token will refresh in ${Math.round(refreshDelay / 1000 / 60)} minutes`);

    // Очищаем предыдущий таймер
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
    }

    // Устанавливаем новый таймер
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

  // Проверяем токен при возвращении на вкладку
  //   useEffect(() => {
  //     const handleVisibilityChange = () => {
  //       if (!document.hidden && isAuthenticated && token) {
  //         scheduleTokenRefresh(token);
  //       }
  //     };

  //     document.addEventListener('visibilitychange', handleVisibilityChange);

  //     return () => {
  //       document.removeEventListener('visibilitychange', handleVisibilityChange);
  //     };
  //   }, [isAuthenticated, token]);

  return null;
};
