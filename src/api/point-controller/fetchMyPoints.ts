import apiClient from '@utils/axios';

export const fetchMyPoints = async () => {
  try {
    const res = await apiClient.get('/api/v1/points/my-points');
    return res.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
