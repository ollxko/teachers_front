import apiClient from './apiClient';

export type NewsItem = {
  postId: string;
  authorId: string;
  title: string;
  description: string;
  postStatus: string;
  createdAt: string;
};

export type NewsResponse = {
  take: number;
  orderFieldName: string;
  orderType: string;
  cursorType: string;
  items: NewsItem[];
  actualTake: number;
};

export type NewsParams = {
  take: number;
};

export const newsApi = {
  getNews: (params?: NewsParams) => apiClient.get<NewsResponse>('/posts', { params }),
  getNewsById: (id: string) => apiClient.get<{ data: NewsItem }>(`/posts/${id}`),
};
