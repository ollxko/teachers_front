// api/authApi.tsx
import apiClient from './apiClient';

export type LoginCredentials = {
  login: string;
  password: string;
};

export type RegisterData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ChangePasswordData = {
  oldPassword: string;
  newPassword: string;
};

export type ResetPasswordData = {
  token: string;
  newPassword: string;
};

export type VerificationEmailData = {
  email: string;
};

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: {
    id: string;
    username: string;
    email: string;
    roles: string[];
  };
};

export const authApi = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<AuthResponse>('/auth/login', credentials),

  register: (data: RegisterData) => apiClient.post<AuthResponse>('/auth/register', data),

  refreshToken: () => apiClient.post('/auth/refresh'),

  logout: () => apiClient.post('/auth/logout'),

  changePassword: (data: ChangePasswordData) => apiClient.post('/auth/changePassword', data),

  sendVerificationEmailForRegistration: (data: VerificationEmailData) =>
    apiClient.post('/auth/sendVerificationEmailForRegistration', data),

  sendVerificationEmailForResetPassword: (data: VerificationEmailData) =>
    apiClient.post('/auth/sendVerificationEmailForResetPassword', data),

  resetPassword: (data: ResetPasswordData) => apiClient.post('/auth/resetPassword', data),

  // getProfile: () => apiClient.get('/auth/profile'),
};
