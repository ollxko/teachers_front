import { useState, useEffect } from 'react';
import { eventsApi, type GetEventResponse } from '../../api/eventsApi';

export const useEventItem = (id: string | undefined) => {
  const [eventsItem, setEventItem] = useState<GetEventResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('ID события не указан');
      setLoading(false);
      return;
    }

    fetchEventItem(id);
  }, [id]);

  const fetchEventItem = async (eventId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await eventsApi.getEventsById(eventId);

      if (response.data) {
        setEventItem(response.data);
      } else {
        setError('Событие не найдено или некорректные данные');
      }
    } catch (err: any) {
      console.error('Ошибка при загрузке события:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    eventsItem,
    loading,
    error,
  };
};
