import { useState, useEffect } from 'react';
import { coursesApi, type GetCourseResponse } from '../../api/coursesApi';

export const useCourseItem = (id: string | undefined) => {
  const [coursesItem, setCourseItem] = useState<GetCourseResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('ID курса не указан');
      setLoading(false);
      return;
    }

    fetchCourseItem(id);
  }, [id]);

  const fetchCourseItem = async (courseId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await coursesApi.getCourseById(courseId);

      if (response.data) {
        setCourseItem(response.data);
      } else {
        setError('Курс не найден или некорректные данные');
      }
    } catch (err: any) {
      console.error('Ошибка при загрузке курса:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    coursesItem,
    loading,
    error,
  };
};
