import { useMutation } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@stores/client/useAuthStore';
import {
  loginRequestQuery,
  adminLoginRequestQuery,
  signupRequestQuery,
  requestAuthCodeQuery,
  confirmAuthCodeQuery,
  resetPasswordRequestQuery,
  resetPasswordQuery,
} from './queries';
import { logoutRequest } from '@api/auth';

// 참가자 로그인
export const useLoginMutation = () => {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  return useMutation({
    mutationKey: loginRequestQuery.queryKey,
    mutationFn: loginRequestQuery.queryFn,
    onSuccess: (data) => {
      setAuth({
        accessToken: data.accessToken,
        identifier: data.identifier,
        role: data.role,
        id: data.id,
      });
      const params = new URLSearchParams(location.search);
      const redirectTo = params.get('redirectTo') || '/mypage';
      navigate(redirectTo);
    },
    onError: (error: any) => {
      alert(error.message || '로그인 중 오류가 발생했습니다.');
    },
  });
};

// 관리자 로그인
export const useAdminLoginMutation = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationKey: adminLoginRequestQuery.queryKey,
    mutationFn: adminLoginRequestQuery.queryFn,
    onSuccess: (data) => {
      setAuth({
        accessToken: data.accessToken,
        identifier: data.identifier,
        role: data.role,
        id: data.id,
      });
      if (data.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/recruiter/list');
      }
    },
    onError: (error: any) => {
      alert(error.message || '관리자 로그인 중 오류가 발생했습니다.');
    },
  });
};

// 회원가입
export const useAuthSignupMutation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationKey: signupRequestQuery.queryKey,
    mutationFn: signupRequestQuery.queryFn,
    onSuccess: (data) => {
      setAuth({
        accessToken: data.data.accessToken,
        identifier: data.data.identifier,
        role: data.data.role,
        id: data.data.id,
      })
      alert('회원가입이 완료되었습니다.');
      
      const params = new URLSearchParams(location.search);
      const redirectTo = params.get('redirectTo') || '';

      navigate(`/onboarding${redirectTo 
        ? `?redirectTo=${encodeURIComponent(redirectTo)}` 
        : ''}`);
    },
    onError: (error: any) => {
      alert(error.message || '회원가입 중 오류가 발생했습니다.');
    },
  });
};

// 인증번호 요청 관련 훅
export const useRequestAuthCodeMutation = () => {
  return useMutation({
    mutationKey: requestAuthCodeQuery.queryKey,
    mutationFn: requestAuthCodeQuery.queryFn,
    onSuccess: () => {
      alert('인증번호가 이메일로 발송되었습니다.');
    },
    onError: (error: any) => {
      alert(error.message || '인증번호 요청 중 오류가 발생했습니다.');
    },
  });
};

// 회원가입 인증번호 확인
export const useConfirmAuthCodeMutation = () => {
  return useMutation({
    mutationKey: confirmAuthCodeQuery.queryKey,
    mutationFn: confirmAuthCodeQuery.queryFn,
    onSuccess: () => {
      alert('인증번호가 확인되었습니다.');
    },
    onError: (error: any) => {
      alert(error.message || '인증번호 확인 중 오류가 발생했습니다.');
    },
  });
};

// 비밀번호 설정 인증번호
export const useResetPasswordRequestMutation = () => {
  return useMutation({
    mutationKey: resetPasswordRequestQuery.queryKey,
    mutationFn: resetPasswordRequestQuery.queryFn,
    onSuccess: () => {
      alert('인증번호가 이메일로 발송되었습니다.');
    },
    onError: (error: any) => {
      alert(error.message || '인증번호 요청 중 오류가 발생했습니다.');
    },
  });
};

//비밀번호 재설정
export const useResetPasswordMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: resetPasswordQuery.queryKey,
    mutationFn: resetPasswordQuery.queryFn,
    onSuccess: () => {
      alert('비밀번호가 성공적으로 변경되었습니다.');
      useAuthStore.getState().clearAuth();
      navigate('/participant-login');
    },
    onError: (error: any) => {
      alert(error.message || '비밀번호 변경 중 오류가 발생했습니다.');
    },
  });
};

export const useLogoutMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      alert('로그아웃 되었습니다.');
      useAuthStore.getState().clearAuth();
      navigate('/');
    },
    onError: (error: any) => {
      alert(error.message || '로그아웃에 실패하였습니다.');
    },
  });
};
