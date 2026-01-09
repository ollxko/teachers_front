import { useState, useCallback } from 'react';
import {
  eventsApi,
  type AddEventRequest,
} from '../../api/eventApi';

export const useAddEvent = () => {
  const [result, setResult] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addEvent = useCallback(async (event: AddEventRequest) => {
    try {
      setLoading(true);
      setError(null);
      setResult(false);

      const response = await eventsApi.addEvent(event);

      if (response.status === 201) {
        setResult(true);
        return true;
      }
      return false;

    } catch (err: any) {
      setError(err.message || 'Ошибка при создании события');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { addEvent, result, loading, error };
};

