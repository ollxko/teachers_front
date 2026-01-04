import { useState, useEffect } from 'react';
import { newsApi } from '../api/newsApi';

export type NewsItemData = {
  id: string;
  title: string;
  content: string;
  date: string;
  images?: string[];
};

const transformApiNewsItem = (apiItem: any): NewsItemData => ({
  id: apiItem.postId,
  title: apiItem.title,
  content: apiItem.description,
  date: new Date(apiItem.createdAt).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }),
  images: apiItem.imageUrl ? [apiItem.imageUrl] : [],
});

export const useNewsItem = (id: string | undefined) => {
  const [newsItem, setNewsItem] = useState<NewsItemData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('ID новости не указан');
      setLoading(false);
      return;
    }

    fetchNewsItem(id);
  }, [id]);

  const fetchNewsItem = async (newsId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await newsApi.getNewsById(newsId);

      if (response.data) {
        setNewsItem(transformApiNewsItem(response.data));
      } else {
        setError('Новость не найдена или некорректные данные');
      }
    } catch (err: any) {
      console.error('Ошибка при загрузке новости:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    newsItem,
    loading,
    error,
  };
};
