import { useState, useCallback } from 'react';
import { coursesApi, type AddCourseRequest } from '../../api/coursesApi';

export const useAddCourse = () => {
  const [result, setResult] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addCourse = useCallback(async (course: AddCourseRequest) => {
    try {
      setLoading(true);
      setError(null);
      setResult(false);

      const response = await coursesApi.addCourse(course);

      if (response.status === 201) {
        setResult(true);
        return true;
      }
      return false;
    } catch (err: any) {
      setError(err.message || 'Ошибка при создании курса');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { addCourse, result, loading, error };
};
