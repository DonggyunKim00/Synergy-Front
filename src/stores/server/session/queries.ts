import { fetchSessionDetail, fetchSessionList } from '@api/session-controller';
import { queryOptions } from '@tanstack/react-query';

export const sessionQueries = {
  all: () => ['session'],
  list: () => [...sessionQueries.all(), 'list'],
  lists: () =>
    queryOptions({
      queryKey: [...sessionQueries.list()],
      queryFn: () => fetchSessionList(),
    }),
  detail: (sessionId: number) => [...sessionQueries.all(), 'detail', sessionId],
  details: (sessionId: number, redirectTo?: string) =>
    queryOptions({
      queryKey: [...sessionQueries.detail(sessionId)],
      queryFn: () => fetchSessionDetail(sessionId, redirectTo),
    }),
};
