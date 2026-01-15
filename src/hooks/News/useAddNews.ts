import { useState, useCallback } from 'react';
import { newsApi, type CreatePostRequest } from '../../api/newsApi';

export const useAddNews = () => {
  const [result, setResult] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createPost = useCallback(async (news: CreatePostRequest) => {
    try {
      setLoading(true);
      setError(null);
      setResult(false);

      const response = await newsApi.addNews(news);

      if (response.status === 201) {
        setResult(true);
        return true;
      }
      return false;
    } catch (err: any) {
      setError(err.message || 'Ошибка при создании новости');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createPost, result, loading, error };
};
