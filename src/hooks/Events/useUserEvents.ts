import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { userEventsApi, type UserEventWithRegistration } from '../../api/userRegistrationsApi';
import { eventRegistrationsApi } from '../../api/eventRegistrationsApi';

export const useUserEvents = () => {
  const { user, isAuthenticated } = useAuth();
  const [events, setEvents] = useState<UserEventWithRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserEvents = useCallback(async () => {
    if (!user?.id || !isAuthenticated) {
      setEvents([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const userEvents = await userEventsApi.getRegisteredEvents(user.id);
      setEvents(userEvents);
    } catch (err) {
      setError('Не удалось загрузить события');
      console.error('Ошибка при загрузке событий пользователя:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, isAuthenticated]);

  // Обновлять события при изменении пользователя
  useEffect(() => {
    fetchUserEvents();
  }, [fetchUserEvents]);

  // Функция для отмены регистрации
  const cancelRegistration = useCallback(
    async (registrationId: string) => {
      try {
        await eventRegistrationsApi.deleteRegistration(registrationId);
        // Обновляем список после удаления
        await fetchUserEvents();
        return true;
      } catch (err) {
        console.error('Ошибка при отмене регистрации:', err);
        return false;
      }
    },
    [fetchUserEvents]
  );

  return {
    events,
    isLoading,
    error,
    refresh: fetchUserEvents,
    cancelRegistration,
    hasRegisteredEvents: events.length > 0,
  };
};
