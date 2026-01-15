// hooks/Events/useEventRegistrations.ts
import { useState, useCallback } from 'react';
import {
  eventRegistrationsApi,
  type EventRegistration,
  type EventRegistrationsResponse,
} from '../../api/eventRegistrationsApi';
import { usersApi, type User } from '../../api/usersApi';

// Расширяем тип регистрации с данными пользователя
export type EventRegistrationWithUser = EventRegistration & {
  user?: User;
};

// Расширяем тип ответа с пользователями
export type EventRegistrationsResponseWithUsers = {
  take: number;
  orderFieldName: string;
  orderType: string;
  cursorType: string;
  items: EventRegistrationWithUser[];
  actualTake: number;
};

export const useEventRegistrations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRegistration = useCallback(async (eventId: string, userId: string) => {
    setLoading(true);
    setError(null);

    try {
      const registration = await eventRegistrationsApi.createRegistration(eventId, userId);
      setLoading(false);
      return registration;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Не удалось записаться на событие';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  }, []);

  const deleteRegistration = useCallback(async (registrationId: string) => {
    setLoading(true);
    setError(null);

    try {
      await eventRegistrationsApi.deleteRegistration(registrationId);
      setLoading(false);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Не удалось отменить запись';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  }, []);

  const checkUserRegistration = useCallback(async (eventId: string, userId: string) => {
    setLoading(true);
    setError(null);

    try {
      const registration = await eventRegistrationsApi.checkUserRegistration(eventId, userId);
      setLoading(false);
      return registration;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Не удалось проверить регистрацию';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  }, []);

  const getRegistrations = useCallback(
    async (params?: {
      cursor?: string;
      take?: number;
      order?: string;
      user?: string;
      eventId?: string;
    }) => {
      setLoading(true);
      setError(null);

      try {
        const response = await eventRegistrationsApi.getRegistrations(params);
        setLoading(false);
        return response;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || 'Не удалось получить список регистраций';
        setError(errorMessage);
        setLoading(false);
        throw err;
      }
    },
    []
  );

  // Новая функция: получить регистрации с данными пользователей
  const getRegistrationsWithUsers = useCallback(
    async (params?: {
      cursor?: string;
      take?: number;
      order?: string;
      user?: string;
      eventId?: string;
    }) => {
      setLoading(true);
      setError(null);

      try {
        // Получаем регистрации
        const response = await eventRegistrationsApi.getRegistrations(params);

        // Если нет регистраций, возвращаем пустой массив
        if (!response.items || response.items.length === 0) {
          setLoading(false);
          return {
            ...response,
            items: [],
          } as EventRegistrationsResponseWithUsers;
        }

        // Уникальные ID пользователей (убираем дубликаты)
        const uniqueUserIds = [...new Set(response.items.map(reg => reg.userId))];

        // Получаем данные пользователей параллельно
        const userPromises = uniqueUserIds.map(userId =>
          usersApi.getUserById(userId).catch(err => {
            console.error(`Error fetching user ${userId}:`, err);
            // Возвращаем заглушку для пользователя при ошибке
            return {
              id: userId,
              userName: 'Неизвестный пользователь',
              email: 'Не указан',
              role: 'Пользователь',
            } as User;
          })
        );

        const users = await Promise.all(userPromises);

        // Создаем маппинг userId -> user для быстрого поиска
        const userMap = new Map<string, User>();
        users.forEach(user => {
          userMap.set(user.id, user);
        });

        // Сопоставляем пользователей с регистрациями
        const registrationsWithUsers: EventRegistrationWithUser[] = response.items.map(reg => ({
          ...reg,
          user: userMap.get(reg.userId),
        }));

        setLoading(false);

        return {
          ...response,
          items: registrationsWithUsers,
        } as EventRegistrationsResponseWithUsers;
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || 'Не удалось получить список регистраций с пользователями';
        setError(errorMessage);
        setLoading(false);
        throw err;
      }
    },
    []
  );

  // Функция для получения регистраций конкретного события с пользователями
  const getEventRegistrationsWithUsers = useCallback(
    async (eventId: string, take: number = 100) => {
      return getRegistrationsWithUsers({
        eventId,
        take,
        order: 'desc:createdAt',
      });
    },
    [getRegistrationsWithUsers]
  );

  // Функция для получения регистраций конкретного пользователя
  const getUserRegistrations = useCallback(
    async (userId: string, take: number = 100) => {
      return getRegistrations({
        user: userId,
        take,
        order: 'desc:createdAt',
      });
    },
    [getRegistrations]
  );

  // Функция для получения регистраций пользователя с данными событий
  const getUserRegistrationsWithEvents = useCallback(
    async (userId: string, take: number = 100) => {
      return getRegistrationsWithUsers({
        user: userId,
        take,
        order: 'desc:createdAt',
      });
    },
    [getRegistrationsWithUsers]
  );

  return {
    loading,
    error,
    createRegistration,
    deleteRegistration,
    checkUserRegistration,
    getRegistrations,
    getRegistrationsWithUsers,
    getEventRegistrationsWithUsers,
    getUserRegistrations,
    getUserRegistrationsWithEvents,
  };
};
