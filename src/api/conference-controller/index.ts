import apiClient from '@utils/axios';
import { AxiosError } from 'axios';

const CONFERENCE_ID = 1;

// 세션,부스,컨퍼런스 참여자 조회
export const fetchConferenceUsers = async () => {
  try {
    const res = await apiClient.get(`/api/v1/conference/${CONFERENCE_ID}`);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.status === 403 || err.status === 401)
        return (window.location.href = '/');
    }
    return Promise.reject(err);
  }
};
