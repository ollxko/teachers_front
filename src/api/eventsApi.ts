import apiClient from './apiClient';

export type EventsItem = {
  id: string;
  name: string;
  type: string;
  date: string;
  description: string;
  address: string;
  imageUrl: string;
};

export type EventsResponse = {
  take: number;
  orderFieldName: string;
  orderType: string;
  cursorType: string;
  items: EventsItem[];
  actualTake: number;
};

export type EventsParams = {
  take: number;
};

export const eventsApi = {
  getEvents: (params?: EventsParams) => apiClient.get<EventsResponse>('/events', { params }),
  getEventById: (id: string) => apiClient.get<EventsItem>(`/events/${id}`),
};
