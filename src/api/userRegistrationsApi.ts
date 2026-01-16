import { eventsApi } from './eventsApi';
import { eventRegistrationsApi } from './eventRegistrationsApi';
import type { GetEventResponse } from './eventsApi';
import type { EventRegistration } from './eventRegistrationsApi';

export type UserEventWithRegistration = {
  event: GetEventResponse;
  registration: EventRegistration;
};

export const userEventsApi = {
  getRegisteredEvents: async (userId: string): Promise<UserEventWithRegistration[]> => {
    try {
      const registrationsResponse = await eventRegistrationsApi.getRegistrations({
        user: userId,
        take: 100,
      });

      if (!registrationsResponse.items || registrationsResponse.items.length === 0) {
        return [];
      }

      const eventsWithRegistrationsPromises = registrationsResponse.items.map(
        async registration => {
          try {
            const response = await eventsApi.getEventsById(registration.eventId);
            const event = response.data;

            return {
              event,
              registration,
            } as UserEventWithRegistration;
          } catch (error) {
            console.error(`Ошибка при получении события ${registration.eventId}:`, error);
            return null;
          }
        }
      );

      const results = await Promise.all(eventsWithRegistrationsPromises);

      const validResults = results.filter(
        (item): item is UserEventWithRegistration => item !== null && item.event !== null
      );

      return validResults;
    } catch (error) {
      console.error('Ошибка при получении событий пользователя:', error);
      throw error;
    }
  },

  isUserRegistered: async (eventId: string, userId: string): Promise<boolean> => {
    const registration = await eventRegistrationsApi.checkUserRegistration(eventId, userId);
    return registration !== null;
  },

  getRegistrationsWithEvents: async (userId: string) => {
    const registrationsResponse = await eventRegistrationsApi.getRegistrations({
      user: userId,
      take: 100,
    });

    return registrationsResponse.items;
  },
};
