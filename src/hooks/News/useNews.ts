import { useState, useEffect, useCallback } from 'react';
import { newsApi, type GetPostResponse, type NewsParams } from '../../api/newsApi';

export const useNews = (params?: NewsParams) => {
  const [news, setNews] = useState<GetPostResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    take: 10,
    actualTake: 0,
    hasMore: true,
  });

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await newsApi.getNews(params);
      const data = response.data;

      setNews(data.items);
      setPagination({
        take: data.take,
        actualTake: data.actualTake,
        hasMore: data.actualTake >= data.take,
      });
    } catch (err: any) {
      setError(err.message || 'Ошибка при загрузке новостей');
      console.error('Failed to fetch news:', err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return { news, loading, error };
};
