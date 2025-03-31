import { fetchBoothDetail, fetchBoothList } from '@api/booth-controller';
import { queryOptions } from '@tanstack/react-query';

export const boothQueries = {
  all: () => ['booth'],
  list: () => [...boothQueries.all(), 'list'],
  lists: () =>
    queryOptions({
      queryKey: [...boothQueries.list()],
      queryFn: () => fetchBoothList(),
    }),
  detail: (boothId: number) => [...boothQueries.all(), 'detail', boothId],
  details: (boothId: number, redirectTo?: string) =>
    queryOptions({
      queryKey: [...boothQueries.detail(boothId)],
      queryFn: () => fetchBoothDetail(boothId, redirectTo),
    }),
};
