import apiClient from './apiClient';
import type { PagedResult } from './pagedResult';

export type GetEventResponse = {
  id: string;
  name: string;
  description: string;
  date: string;
  eventType: string;
  address: string;
  imageUrl: string;
};

export type AddEventRequest = {
  name: string;
  description: string;
  type: number;
  date: string;
  address: string;
  imageBase64: string;
};

export type EventsParams = {
  take: number;
};

export const eventsApi = {
  getEvents: (params?: EventsParams) => apiClient.get<PagedResult<GetEventResponse>>('/events', { params }),
  getEventsById: (id: string) => apiClient.get<GetEventResponse>(`/events/${id}`),
  addEvent: (data: AddEventRequest) => apiClient.post<GetEventResponse>('/events', {data})
};
