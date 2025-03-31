import apiClient from '@utils/axios';
import { AxiosError } from 'axios';

export const fetchAttendeesList = async (
  id: number,
  filters?: {
    page?: number;
    size?: number;
    sort?: string[]; 
    occupations?: string; 
    educationLevel?: string; 
    ageGroup?: string; 
    experienceLevel?: string; 
    regions?: string
    liked?: boolean; 
    [key: string]: any;
  }
): Promise<any> => {
  try {
    const endpoint = `/api/v1/recruiter/${id}/attendees`;

    const res = await apiClient.get(endpoint, { params: filters });
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 403) {
        window.location.href = '/';
        return Promise.reject(new Error('Unauthorized access'));
      }
    }
    return Promise.reject(err);
  }
};

export const postLikeAttendee = async (attendeeId: number) => {
  try{
    const res = await apiClient.post(`/api/v1/recruiter/attendees/${attendeeId}/like`);
    return res.data;
  } catch (err){
    if(err instanceof AxiosError) {
      if(err.response?.status === 403){
        window.location.href = '/';
      }
    }
    return Promise.reject(err);
  }
}

export const deleteUnlikeAttendee = async (attendeeId: number) => {
  try {
    const res = await apiClient.delete(`/api/v1/recruiter/attendees/${attendeeId}/unlike`);
      return res.data;
  } catch (err) {
      if(err instanceof AxiosError) {
        if(err.response?.status === 403) {
          window.location.href = '/';
        }
      }
      return Promise.reject(err);
  }
}

export const fetchRecruiterInfo = async () => {
  try{
    const res = await apiClient.get(`/api/v1/recruiter/my`);
      return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
}

export const fetchLikedAttendees = async () => {
  try{
    const res = await apiClient.get(`/api/v1/recruiter/me/liked-attendees`);
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
}