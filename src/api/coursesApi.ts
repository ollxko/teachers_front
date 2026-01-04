import apiClient from './apiClient';

export type CoursesItem = {
  courseId: string;
  title: string;
  description: string;
  link: string;
  createdAt: string;
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
  getCourses: (params?: CoursesParams) => apiClient.get<CoursesResponse>('/posts', { params }),
  getCoursesById: (id: string) => apiClient.get<{ data: CoursesItem }>(`/posts/${id}`),
};
