import apiClient from '@utils/axios';
import { AxiosError } from 'axios';

const CONFERENCE_ID = 1;

// 세션별 참여율 조회
export const fetchSessionDashboard = async () => {
  try {
    const res = await apiClient.get(
      `/api/v1/dashboard/conference/${CONFERENCE_ID}`,
    );
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.status === 403) return (window.location.href = '/');
    }
    return Promise.reject(err);
  }
};

// 세션별 참여율 상세 조회
export const fetchSessionDashboardDetails = async () => {
  try {
    const res = await apiClient.get(
      `/api/v1/dashboard/conference/${CONFERENCE_ID}/detail`,
    );
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.status === 403) return (window.location.href = '/');
    }
    return Promise.reject(err);
  }
};

// 부스 참여율 조회
export const fetchBoothDashboard = async () => {
  try {
    const res = await apiClient.get(
      `/api/v1/dashboard/conference/${CONFERENCE_ID}/booths/participation`,
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

// 부스별 참여율 상세 조회
export const fetchBoothDashboardDetails = async () => {
  try {
    const res = await apiClient.get(
      `/api/v1/dashboard/conference/${CONFERENCE_ID}/booths/participation/interest`,
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
