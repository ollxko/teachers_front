import apiClient from './apiClient';
import type { PagedResult } from './pagedResult';

export type GetCourseResponse = {
  id: string;
  name: string;
  description?: string;
  link?: string;
  createdAt: string;
  imageUrl?: string;
  price: number;
};

export type AddCourseRequest = {
  name: string;
  description: string;
  link: string;
  imageBase64?: string;
  price: number;
};

export type CoursesParams = {
  take: number;
};

export const coursesApi = {
  getCourses: (params?: CoursesParams) =>
    apiClient.get<PagedResult<GetCourseResponse>>('/courses', { params }),
  getCourseById: (id: string) => apiClient.get<GetCourseResponse>(`/courses/${id}`),
  addCourse: (data: AddCourseRequest) => apiClient.post<GetCourseResponse>('/courses', data),
};
