import apiClient from './apiClient';

export type EventRegistration = {
  id: string;
  createdAt: string;
  userId: string;
  eventId: string;
};

export type EventRegistrationsResponse = {
  take: number;
  orderFieldName: string;
  orderType: string;
  cursorType: string;
  items: EventRegistration[];
  actualTake: number;
};

export const eventRegistrationsApi = {
  createRegistration: async (eventId: string, userId: string): Promise<EventRegistration> => {
    const response = await apiClient.post('/eventsRegistrations', {
      eventId,
      userId,
    });
    return response.data;
  },

  getRegistrationById: async (id: string): Promise<EventRegistration> => {
    const response = await apiClient.get(`/eventsRegistrations/${id}`);
    return response.data;
  },

  getRegistrations: async (params?: {
    cursor?: string;
    take?: number;
    order?: string;
    user?: string;
    eventId?: string;
  }): Promise<EventRegistrationsResponse> => {
    const response = await apiClient.get('/eventsRegistrations', { params });
    return response.data;
  },

  checkUserRegistration: async (
    eventId: string,
    userId: string
  ): Promise<EventRegistration | null> => {
    try {
      const response = await apiClient.get('/eventsRegistrations', {
        params: {
          eventId,
          user: userId,
          take: 1,
        },
      });

      if (response.data.items && response.data.items.length > 0) {
        return response.data.items[0];
      }
      return null;
    } catch (error) {
      console.error('Ошибка при проверке регистрации:', error);
      return null;
    }
  },

  deleteRegistration: async (id: string): Promise<void> => {
    await apiClient.delete(`/eventsRegistrations/${id}`);
  },
};
