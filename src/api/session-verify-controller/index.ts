import apiClient from '@utils/axios';
import { AxiosError } from 'axios';

// 세션 Q&A 제출
export const postQna = async (sessionId: number, content: string) => {
  try {
    const res = await apiClient.post(
      `/api/v1/verify/session/${sessionId}/participation`,
      {
        content,
      },
    );
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.status === 403) return (window.location.href = '/');
    }
    return Promise.reject(err);
  }
};

// 세션 QR 체크인
export const postQrVerify = async (sessionId: number, qrCode: string) => {
  try {
    const res = await apiClient.post(
      `/api/v1/verify/session/${sessionId}?qrCode=${qrCode}`,
    );
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.status === 403) return (window.location.href = '/');
    }
    return Promise.reject(err);
  }
};
