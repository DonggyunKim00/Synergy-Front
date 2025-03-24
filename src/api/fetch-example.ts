import apiClient from '@utils/axios';

// api 파일에 들어갈 비동기 함수
export const fetchProfile = async () => {
  try {
    const res = await apiClient.post(`/api/v1/auth/attendee/login`);
    return res;
  } catch (err) {
    window.location.href = '/login';
    return Promise.reject(err);
  }
};
