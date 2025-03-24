import { useAuthStore } from '@stores/client/useAuthStore';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState().user;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터 (엑세스 토큰 만료시 처리 방식)
{
  /*
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 응답이 401일때(accessToken이 만료되었을때)
    // refresh 토큰을 이용해서 재발급 받고 이전 요청을 다시 요청함
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { setAuth, clearAuth } = useAuthStore.getState();
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        const newUser = res.data?.data;
        setAuth(newUser);

        originalRequest.headers.Authorization = `Bearer ${newUser.accessToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        clearAuth();
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);
*/
}

export default apiClient;
