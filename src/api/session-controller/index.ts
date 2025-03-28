import apiClient from '@utils/axios';
import { AxiosError } from 'axios';

const CONFERENCE_ID = 1;

// 세션 리스트 조회
export const fetchSessionList = async () => {
  try {
    const res = await apiClient.get(
      `/api/v1/conference/${CONFERENCE_ID}/session`,
    );
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.status === 403) return (window.location.href = '/');
    }
    return Promise.reject(err);
  }
};

// 세션 상세 조회
export const fetchSessionDetail = async (sessionId: number) => {
  try {
    const res = await apiClient.get(
      `/api/v1/conference/${CONFERENCE_ID}/session/${sessionId}`,
    );
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.status === 403) return (window.location.href = '/');
    }
    return Promise.reject(err);
  }
};
