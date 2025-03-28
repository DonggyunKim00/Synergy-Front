import apiClient from '@utils/axios';
import { AxiosError } from 'axios';

const CONFERENCE_ID = 1;

// 부스 리스트 조회
export const fetchBoothList = async () => {
  try {
    const res = await apiClient.get(
      `/api/v1/conference/${CONFERENCE_ID}/booths?size=100`,
    );
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.status === 403) return (window.location.href = '/');
    }
    return Promise.reject(err);
  }
};

// 부스 상세 조회
export const fetchBoothDetail = async (boothId: number) => {
  try {
    const res = await apiClient.get(
      `/api/v1/conference/${CONFERENCE_ID}/booths/${boothId}`,
    );
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.status === 403) return (window.location.href = '/');
    }
    return Promise.reject(err);
  }
};
