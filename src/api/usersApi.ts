// api/usersApi.ts
import apiClient from './apiClient';

export type User = {
  id: string; // ID мы получим из параметра запроса
  userName: string;
  email: string;
  role: string;
};

export const usersApi = {
  getUserById: async (userId: string): Promise<User> => {
    console.log(`[usersApi] getUserById called for userId: ${userId}`);

    try {
      const response = await apiClient.get(`/users/${userId}`);
      console.log(`[usersApi] Success response for ${userId}:`, response.data);

      // API возвращает {userName, email, role} но НЕ id
      // Добавляем id из параметра запроса
      return {
        id: userId, // Добавляем id который мы знаем
        userName: response.data.userName,
        email: response.data.email,
        role: response.data.role,
      };
    } catch (error: any) {
      console.error(`[usersApi] Error for ${userId}:`, error);
      throw error;
    }
  },
};
