import apiClient from './apiClient';
import type { PagedResult } from './pagedResult';

export type GetPostResponse = {
  postId: string;
  authorId: string;
  title: string;
  description: string;
  postStatus: string;
  createdAt: string;
  imageUrl: string;
};

export type CreatePostRequest = {
  title: string;
  description: string;
  imageBase64?: string;
  postStatus?: number;
};

export type NewsParams = {
  take: number;
};

export const newsApi = {
  getNews: (params?: NewsParams) =>
    apiClient.get<PagedResult<GetPostResponse>>('/posts', { params }),
  getNewsById: (id: string) => apiClient.get<GetPostResponse>(`/posts/${id}`),
  addNews: (data: CreatePostRequest) => apiClient.post<GetPostResponse>('/posts', data),
};
