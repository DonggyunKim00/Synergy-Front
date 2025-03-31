import { useSuspenseQuery } from '@tanstack/react-query';
import { rankingQueries } from './queries';

export const usePointRanking = () => {
  return useSuspenseQuery(rankingQueries.point());
};

export const useMembershipRanking = () => {
  return useSuspenseQuery(rankingQueries.membership());
};
