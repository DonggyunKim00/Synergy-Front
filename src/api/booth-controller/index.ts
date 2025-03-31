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
export const fetchBoothDetail = async (
  boothId: number,
  redirectTo?: string,
) => {
  try {
    const res = await apiClient.get(
      `/api/v1/conference/${CONFERENCE_ID}/booths/${boothId}`,
    );
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.status === 403) return (window.location.href = '/');
      if (err.status === 401)
        return redirectTo
          ? (window.location.href = `/participant-login?redirectTo=${redirectTo}`)
          : (window.location.href = '/');
    }
    return Promise.reject(err);
  }
};

//부스 생성
export const createBooth = async (formData: FormData) => {
  try {
    const res = await apiClient.post(
      `/api/v1/conference/${CONFERENCE_ID}/booths`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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

// 부스 삭제
export const deleteBooth = async (boothId: number) => {
  try {
    const res = await apiClient.delete(
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

// 부스 수정
export const modifyBooth = async (boothId: number, formData: FormData) => {
  try {
    const res = await apiClient.put(
      `/api/v1/conference/${CONFERENCE_ID}/booths/${boothId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
