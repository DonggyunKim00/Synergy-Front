import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { boothQueries } from './queries';
import { createBooth, deleteBooth, modifyBooth } from '@api/booth-controller';
import { dashboardQueries } from '../dashboard/queries';
import { modifySession } from '@api/session-controller';

export const useBoothList = () => {
  return useSuspenseQuery(boothQueries.lists());
};

export const useBoothDetail = (boothId: number, redirectTo?: string) => {
  return useSuspenseQuery(boothQueries.details(boothId, redirectTo));
};

export const useCreateBooth = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createBooth(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(dashboardQueries.booths());
      alert('부스가 생성되었습니다.');
    },
    onError: () => {
      alert('부스 생성에 실패하였습니다.');
    },
  });
};

export const useDeleteBooth = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (boothId: number) => deleteBooth(boothId),
    onSuccess: () => {
      queryClient.invalidateQueries(dashboardQueries.boothDetail());
      alert('부스가 삭제되었습니다.');
    },
    onError: () => {
      alert('부스 삭제에 실패하였습니다.');
    },
  });
};

export const useModifyBooth = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      boothId,
      formData,
    }: {
      boothId: number;
      formData: FormData;
    }) => modifyBooth(boothId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(dashboardQueries.boothDetail());
      alert('부스가 수정되었습니다.');
    },
    onError: () => {
      alert('부스 수정에 실패하였습니다.');
    },
  });
};
