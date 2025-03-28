import apiClient from '@utils/axios';

export const signupRequest = async (data: {
  name: string;
  email: string;
  password: string;
  phone: string;
}) => {
  const response = await apiClient.post('/api/v1/auth/attendee/signup', data);
  return response.data;
};

export const requestAuthCode = async (email: string) => {
  const response = await apiClient.post('/api/v1/auth/email/verification/request', { email });
  return response.data;
};

export const confirmAuthCode = async (data: { email: string; code: string }) => {
  const response = await apiClient.post('/api/v1/auth/email/verification/confirm', data);
  return response.data;
};

export const resetPasswordRequest = async (data: { name: string; email: string; phone: string }) => {
  const response = await apiClient.post('/api/v1/auth/password/reset/request', data);
  return response.data;
};

export const resetPassword = async (data: { email: string; newPassword: string }) => {
  const response = await apiClient.post('/api/v1/auth/password/reset', data);
  return response.data;
};

export const loginRequest = async (data: { email: string; password: string }) => {
  const response = await apiClient.post('/api/v1/auth/attendee/login', data);
  return response.data.data;
};

export const adminLoginRequest = async (data: { adminAuthCode: string }) => {
  const response = await apiClient.post('/api/v1/auth/admin/login', data);
  return response.data.data;
};