import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { attendeeQueries } from './queries';
import { useAuthStore } from '@stores/client/useAuthStore';
import {
  patchOnboardingDetails,
  patchOnboardingInfos,
  patchProfileImage,
} from '@api/attendee-controller';
import { postQna, postQrVerify } from '@api/session-verify-controller';
import { sessionQueries } from '../session/queries';
import { boothQueries } from '../booth/queries';
import { postQrBoothVerify } from '@api/booth-verify-controller';

export const useAttendeeProfile = () => {
  const { identifier } = useAuthStore.getState().user;
  return useSuspenseQuery(attendeeQueries.users(identifier));
};

export const useAttendeePoints = () => {
  const { identifier } = useAuthStore.getState().user;
  return useSuspenseQuery(attendeeQueries.points(identifier));
};

export const useAttendeeLinkedRecruiters = () => {
  const { identifier } = useAuthStore.getState().user;
  return useSuspenseQuery(attendeeQueries.linkedRecruiters(identifier));
};

export const useAttendeeDetailInfo = (id: number) => {
  return useSuspenseQuery(attendeeQueries.detailInfo(id));
};

export const useOnboardingPatch = () => {
  const queryClient = useQueryClient();
  const { identifier, id } = useAuthStore.getState().user;

  const basicMutation = useMutation({
    mutationFn: ({ form }: any) => patchOnboardingInfos({ form }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: attendeeQueries.user(identifier),
      });
    },
  });

  const detailMutation = useMutation({
    mutationFn: ({ form }: any) => patchOnboardingDetails({ form }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: attendeeQueries.detailInfo(id),
      });
    },
  });

  return { basicMutation, detailMutation };
};

export const useSessionVerify = (sessionId: number) => {
  const queryClient = useQueryClient();
  const { identifier } = useAuthStore.getState().user;

  const qrMutation = useMutation({
    mutationFn: ({ qrCode }: { qrCode: string }) =>
      postQrVerify(sessionId, qrCode),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: attendeeQueries.user(identifier),
      });
      queryClient.invalidateQueries({
        queryKey: sessionQueries.detail(sessionId),
      });
    },
  });

  return { qrMutation };
};

export const useSessionQna = (sessionId: number) => {
  const queryClient = useQueryClient();
  const { identifier } = useAuthStore.getState().user;

  const qnaMutation = useMutation({
    mutationFn: ({ content }: { content: string }) =>
      postQna(sessionId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: attendeeQueries.user(identifier),
      });
      queryClient.invalidateQueries({
        queryKey: sessionQueries.detail(sessionId),
      });
    },
  });

  return { qnaMutation };
};

export const useBoothVerify = (boothId: number) => {
  const queryClient = useQueryClient();
  const { identifier } = useAuthStore.getState().user;

  const qrMutation = useMutation({
    mutationFn: ({ qrCode }: { qrCode: string }) =>
      postQrBoothVerify(boothId, qrCode),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: attendeeQueries.user(identifier),
      });
      queryClient.invalidateQueries({
        queryKey: boothQueries.detail(boothId),
      });
    },
  });

  return { qrMutation };
};

export const useModifyProfileImage = () => {
  const queryClient = useQueryClient();
  const { identifier } = useAuthStore.getState().user;

  return useMutation({
    mutationFn: ({ profileImgFile }: { profileImgFile: File }) =>
      patchProfileImage(profileImgFile),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: attendeeQueries.user(identifier),
      });
      alert('프로필 이미지가 정상적으로 변경되었습니다.');
    },
    onError: (err: any) => {
      if (err.response.data.message === 'Maximum upload size exceeded')
        return alert('이미지 사이즈가 너무 큽니다.');
      alert('프로필 이미지 변경에 실패하였습니다.');
    },
  });
};
