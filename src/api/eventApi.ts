import apiClient from './apiClient';

export type EventsItem = {
  eventId: string;
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
  getEventsById: (id: string) => apiClient.get<{ data: EventsItem }>(`/events/${id}`),
};
