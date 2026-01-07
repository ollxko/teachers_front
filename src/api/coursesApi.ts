import apiClient from './apiClient';

export type CoursesItem = {
  id: string;
  name: string;
  description: string;
  link: string;
  createdAt: string;
  imageUrl: string;
  price: number;
};

export type CoursesResponse = {
  take: number;
  orderFieldName: string;
  orderType: string;
  cursorType: string;
  items: CoursesItem[];
  actualTake: number;
};

export type CoursesParams = {
  take: number;
};

export const coursesApi = {
  getCourses: (params?: CoursesParams) => apiClient.get<CoursesResponse>('/courses', { params }),
  getCourseById: (id: string) => apiClient.get<CoursesItem>(`/courses/${id}`),
};
