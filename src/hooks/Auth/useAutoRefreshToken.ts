import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectToken, selectIsAuthenticated } from '../../store/slices/authSlice';
import { parseJwt } from '../../utils/jwtUtils';
import apiClient from '../../api/apiClient'; // Импортируем напрямую

export const useAutoRefreshToken = () => {
  const token = useSelector(selectToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isRefreshingRef = useRef(false);

  useEffect(() => {
    // Очищаем предыдущий таймер
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }

    if (isAuthenticated && token) {
      const decoded = parseJwt(token);
      if (!decoded?.exp) return;

      const expiresAt = decoded.exp * 1000;
      const now = Date.now();
      const timeToExpire = expiresAt - now;

      // Обновляем токен за 9 минут до истечения
      const refreshDelay = Math.max(timeToExpire - 9 * 60 * 1000, 1000);

      console.log(`Token will refresh in ${Math.round(refreshDelay / 1000 / 60)} minutes`);

      // Устанавливаем таймер
      refreshTimerRef.current = setTimeout(async () => {
        if (isRefreshingRef.current) return;
        isRefreshingRef.current = true;

        try {
          console.log('Auto-refreshing token...');

          // Обновляем токен напрямую через API, без dispatch
          const response = await apiClient.post('/auth/refresh');
          const newToken = response.data.access_token;

          // Сохраняем новый токен в store без перерендера
          // Для этого нужно обновить store напрямую
          const store = (window as any).__storeRef;
          if (store) {
            store.dispatch({
              type: 'auth/refreshToken/fulfilled',
              payload: { access_token: newToken },
            });
          }
        } catch (error) {
          console.error('Token refresh failed:', error);
        } finally {
          isRefreshingRef.current = false;
        }
      }, refreshDelay);
    }

    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }
    };
  }, [token, isAuthenticated]);

  return null;
};
