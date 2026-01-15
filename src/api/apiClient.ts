// apiClient.ts
import axios, { type AxiosInstance } from 'axios';

const API_BASE_URL = '/api';

let apiClientInstance: AxiosInstance | null = null;
let storeRef: any = null;

// Функция для установки store
export const setStoreRef = (store: any) => {
  storeRef = store;
};

export const createApiClient = () => {
  if (apiClientInstance) return apiClientInstance;

  apiClientInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  apiClientInstance.interceptors.request.use(
    config => {
      if (storeRef) {
        const state = storeRef.getState();
        const token = state.auth.token;

        console.log('API Request - Token available:', !!token);
        console.log('API Request - URL:', config.url);

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log('Authorization header added:', token.substring(0, 20) + '...');
        }
      } else {
        console.warn('Store not available in apiClient');
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return apiClientInstance;
};

export default createApiClient();
