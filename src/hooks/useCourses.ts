import { useState, useEffect, useCallback } from 'react';
import {
  coursesApi,
  type CoursesItem,
  type CoursesParams,
  type CoursesResponse,
} from '../api/coursesApi';

export const useCourses = (params?: CoursesParams) => {
  const [Courses, setCourses] = useState<CoursesItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    take: 10,
    actualTake: 0,
    hasMore: true,
  });

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await coursesApi.getCourses(params);
      const data = response.data;

      setCourses(data.items);
      setPagination({
        take: data.take,
        actualTake: data.actualTake,
        hasMore: data.actualTake >= data.take,
      });
    } catch (err: any) {
      setError(err.message || 'Ошибка при загрузке новостей');
      console.error('Failed to fetch Courses:', err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return { Courses, loading, error };
};
