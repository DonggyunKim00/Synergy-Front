import apiClient from '@utils/axios';

interface CreateConferenceRequest {
  name: string;
  host: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location: string;
  place: string;
  conferenceType: string;
}

interface CreateConferenceResponse {
  status: string;
  code: number;
  message: string;
  data: {
    id: number;
  };
}

export const createConference = async (body: CreateConferenceRequest): Promise<CreateConferenceResponse> => {
  const { data } = await apiClient.post('/api/v1/conference', body);
  return data;
};
