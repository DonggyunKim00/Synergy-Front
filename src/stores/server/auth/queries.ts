import { queryOptions } from '@tanstack/react-query';
import { 
  signupRequest,
  requestAuthCode,
  confirmAuthCode,
  resetPasswordRequest,
  loginRequest,
  adminLoginRequest,
  resetPassword
} from '@api/auth';

// 기본 쿼리 키
export const authQueries = {
  all: () => ['auth'],
  signup: () => [...authQueries.all(), 'signup'],
  login: () => [...authQueries.all(), 'login'],
  adminLogin: () => [...authQueries.all(), 'adminLogin'],
  requestAuthCode: () => [...authQueries.all(), 'requestAuthCode'],
  confirmAuthCode: () => [...authQueries.all(), 'confirmAuthCode'],
  resetPassword: () => [...authQueries.all(), 'resetPassword'],
};

// 참가자 로그인
export const loginRequestQuery = {
  queryKey: authQueries.login(),
  queryFn: (data: { email: string; password: string; redirectTo?: string }) => loginRequest(data),
};

// 관리자 로그인
export const adminLoginRequestQuery = {
  queryKey: authQueries.adminLogin(),
  queryFn: (data: { adminAuthCode: string }) => adminLoginRequest(data),
};

// 회원가입
export const signupRequestQuery = {
  queryKey: authQueries.signup(),
  queryFn: (data: { name: string; email: string; ticketCode: string; password: string; phone: string; }) => signupRequest(data),
};

// 회원가입 인증번호 요청
export const requestAuthCodeQuery = {
  queryKey: authQueries.requestAuthCode(),
  queryFn: (email: string) => requestAuthCode(email),
};

// 회원가입 인증번호 확인
export const confirmAuthCodeQuery = {
  queryKey: authQueries.confirmAuthCode(),
  queryFn: (data: { email: string; code: string; purpose: string; }) => confirmAuthCode(data),
};

// 비밀번호 재설정 요청
export const resetPasswordRequestQuery = {
  queryKey: authQueries.resetPassword(),
  queryFn: (data: { name: string; email: string; phone: string }) => resetPasswordRequest(data),
};

//비밀번호 재설정
export const resetPasswordQuery = {
  queryKey: authQueries.resetPassword(),
  queryFn: (data: { email: string; newPassword: string }) => resetPassword(data),
};