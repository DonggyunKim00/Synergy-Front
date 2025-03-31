import {
  fetchMembershipRanking,
  fetchPointRanking,
} from '@api/ranking-controller';
import { queryOptions } from '@tanstack/react-query';

export const rankingQueries = {
  all: () => ['ranking'],
  point: () =>
    queryOptions({
      queryKey: [...rankingQueries.all(), 'point'],
      queryFn: () => fetchPointRanking(),
    }),
  membership: () =>
    queryOptions({
      queryKey: [...rankingQueries.all(), 'membership'],
      queryFn: () => fetchMembershipRanking(),
    }),
};
