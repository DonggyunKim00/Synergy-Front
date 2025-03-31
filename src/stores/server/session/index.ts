import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { sessionQueries } from './queries';
import {
  createSession,
  deleteSession,
  modifySession,
} from '@api/session-controller';
import { dashboardQueries } from '../dashboard/queries';

export const useSessionList = () => {
  return useSuspenseQuery(sessionQueries.lists());
};

export const useSessionDetail = (sessionId: number, redirectTo?: string) => {
  return useSuspenseQuery(sessionQueries.details(sessionId, redirectTo));
};

export const useCreateSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createSession(formData),
    onSuccess: () => {
      queryClient.invalidateQueries(dashboardQueries.sessions());
      alert('세션이 생성되었습니다.');
    },
    onError: () => {
      alert('세션 생성에 실패하였습니다.');
    },
  });
};

export const useDeleteSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: number) => deleteSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries(dashboardQueries.sessionDetail());
      alert('세션이 삭제되었습니다.');
    },
    onError: () => {
      alert('세션 삭제에 실패하였습니다.');
    },
  });
};

export const useModifySession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sessionId,
      formData,
    }: {
      sessionId: number;
      formData: FormData;
    }) => modifySession(sessionId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(dashboardQueries.sessionDetail());
      alert('세션이 수정되었습니다.');
    },
    onError: () => {
      alert('세션 수정에 실패하였습니다.');
    },
  });
};
