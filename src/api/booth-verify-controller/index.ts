import apiClient from '@utils/axios';
import { AxiosError } from 'axios';

// 부스 QR 체크인
export const postQrBoothVerify = async (boothId: number, qrCode: string) => {
  try {
    const res = await apiClient.post(
      `/api/v1/verify/booth/${boothId}?qrCode=${qrCode}`,
    );
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.status === 403) return (window.location.href = '/');
    }
    return Promise.reject(err);
  }
};
