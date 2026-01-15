import { useState, useEffect, useCallback } from 'react';
import { eventsApi, type GetEventResponse, type EventsParams } from '../../api/eventsApi';

export const useEvents = (params?: EventsParams) => {
  const [events, setEvents] = useState<GetEventResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    take: 10,
    actualTake: 0,
    hasMore: true,
  });

  const fetchEvent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventsApi.getEvents(params);
      const data = response.data;

      setEvents(data.items);
      setPagination({
        take: data.take,
        actualTake: data.actualTake,
        hasMore: data.actualTake >= data.take,
      });
    } catch (err: any) {
      setError(err.message || 'Ошибка при загрузке новостей');
      console.error('Failed to fetch event:', err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  return { events, loading, error };
};
