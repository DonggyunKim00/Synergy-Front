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
export const fetchSessionDetail = async (
  sessionId: number,
  redirectTo?: string,
) => {
  try {
    const res = await apiClient.get(
      `/api/v1/conference/${CONFERENCE_ID}/session/${sessionId}`,
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

//세션 생성
export const createSession = async (formData: FormData) => {
  try {
    const res = await apiClient.post(
      `/api/v1/conference/${CONFERENCE_ID}/session`,
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

//세션 삭제
export const deleteSession = async (sessionId: number) => {
  try {
    const res = await apiClient.delete(
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

//세션 수정
export const modifySession = async (sessionId: number, formData: FormData) => {
  try {
    const res = await apiClient.patch(
      `/api/v1/conference/${CONFERENCE_ID}/session/${sessionId}`,
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
