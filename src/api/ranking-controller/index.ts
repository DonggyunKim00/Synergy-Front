import apiClient from '@utils/axios';
import { AxiosError } from 'axios';

const CONFERENCE_ID = 1;

// 참가자 포인트 랭킹
export const fetchPointRanking = async () => {
  try {
    const res = await apiClient.get(
      `/api/v1/admin/conferences/${CONFERENCE_ID}/attendees/point-rankings?size=1000`,
    );
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.status === 403 || err.status === 401)
        return (window.location.href = '/');
    }
    return Promise.reject(err);
  }
};

// 참가자 멤버쉽 랭킹
export const fetchMembershipRanking = async () => {
  try {
    const res = await apiClient.get(
      `/api/v1/admin/conferences/${CONFERENCE_ID}/attendees/level-rankings?size=1000`,
    );
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.status === 403 || err.status === 401)
        return (window.location.href = '/');
    }
    return Promise.reject(err);
  }
};
