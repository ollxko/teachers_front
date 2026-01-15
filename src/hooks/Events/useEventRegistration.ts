// hooks/Events/useEventRegistration.ts
import { useState, useEffect, useCallback } from 'react';
import { useEventRegistrations } from './useEventRegistrations';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/slices/authSlice';

export const useEventRegistration = (eventId?: string) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationId, setRegistrationId] = useState<string | null>(null);

  // Получаем пользователя из Redux
  const user = useSelector(selectCurrentUser);
  const userId = user?.id || null;

  const { loading, error, createRegistration, deleteRegistration, checkUserRegistration } =
    useEventRegistrations();

  // Проверяем регистрацию при изменении eventId или userId
  useEffect(() => {
    const fetchRegistrationStatus = async () => {
      if (!eventId || !userId) {
        setIsRegistered(false);
        setRegistrationId(null);
        return;
      }

      try {
        const registration = await checkUserRegistration(eventId, userId);
        if (registration) {
          setIsRegistered(true);
          setRegistrationId(registration.id);
        } else {
          setIsRegistered(false);
          setRegistrationId(null);
        }
      } catch (error) {
        console.error('Ошибка при проверке регистрации:', error);
        setIsRegistered(false);
        setRegistrationId(null);
      }
    };

    fetchRegistrationStatus();
  }, [eventId, userId, checkUserRegistration]);

  const registerForEvent = useCallback(async () => {
    if (!eventId || !userId) {
      throw new Error('Не удалось определить событие или пользователя');
    }

    try {
      const registration = await createRegistration(eventId, userId);
      setIsRegistered(true);
      setRegistrationId(registration.id);
      return registration;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, [eventId, userId, createRegistration]);

  const cancelRegistration = useCallback(async () => {
    if (!registrationId) {
      throw new Error('Регистрация не найдена');
    }

    try {
      await deleteRegistration(registrationId);
      setIsRegistered(false);
      setRegistrationId(null);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, [registrationId, deleteRegistration]);

  const toggleRegistration = useCallback(async () => {
    if (isRegistered) {
      await cancelRegistration();
    } else {
      await registerForEvent();
    }
  }, [isRegistered, registerForEvent, cancelRegistration]);

  return {
    isRegistered,
    registrationId,
    userId,
    user,
    loading,
    error,
    registerForEvent,
    cancelRegistration,
    toggleRegistration,
    refreshStatus: () => {
      if (eventId && userId) {
        checkUserRegistration(eventId, userId).then(registration => {
          setIsRegistered(!!registration);
          setRegistrationId(registration?.id || null);
        });
      }
    },
  };
};
