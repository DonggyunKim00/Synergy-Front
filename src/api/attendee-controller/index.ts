import apiClient from '@utils/axios';
import { AxiosError } from 'axios';

export const fetchMyProfile = async () => {
  try {
    const res = await apiClient.get('/api/v1/attendee/my');
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.status === 403) return (window.location.href = '/');
    }
    return Promise.reject(err);
  }
};

export const fetchLinkedRecruiters = async () => {
  try {
    const res = await apiClient.get('/api/v1/attendee/liked-recruiters');
    return res.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

export const fetchAttendeeDetailInfo = async (attendeeId: number | null) => {
  try {
    const res = await apiClient.get(`/api/v1/attendee/${attendeeId}`);
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.status === 403) return (window.location.href = '/');
    }
    return Promise.reject(err);
  }
};

export const patchOnboardingInfos = async ({ form }: any) => {
  try {
    const res = await apiClient.patch('/api/v1/attendee/onboarding/job-info', {
      'interestCodes': form.interested_list,
      'jobGroupCode': form.parent,
      'jobPositionCode': form.child,
      'hiringInterested': form.employeement_agree === 'yes' ? true : false,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

export const patchOnboardingDetails = async ({ form }: any) => {
  try {
    const formData = new FormData();

    const requestPayload = {
      workplaceSelectionFactorCodes: form.company || [],
      techStacks: form.skills,
      conferencePurposeCodes: form.purpose || [],
      selfIntroduction: form.cover_letter,
      experienceLevelCode: form.experience,
      desiredWorkRegionCodes: form.hope_location,
      educationLevelCode: form.education,
      desiredJobGroupCode: form.hope_job_group,
      ageGroupCode: form.age,
      additionalInfo: form.others_experience,
      desiredJobPositionCode: form.hope_job_position,
      preferredCorporateCultureCodes: form.culture || [],
    };

    // JSON 데이터를 Blob으로 감싸서 request 필드에 추가
    formData.append(
      'request',
      new Blob([JSON.stringify(requestPayload)], {
        type: 'application/json',
      }),
    );

    // 파일이 있을 경우만 추가
    if (form.profile_img) {
      formData.append('profileImage', form.profile_img);
    }

    const res = await apiClient.patch(
      '/api/v1/attendee/onboarding/job-info-details',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return res.data;
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

export const patchProfileImage = async (profileImgFile: File) => {
  try {
    const formData = new FormData();

    if (profileImgFile) {
      formData.append('profileImage', profileImgFile);
    }

    const res = await apiClient.patch(
      '/api/v1/attendee/profile-image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return res.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
