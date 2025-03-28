import { useSuspenseQuery } from '@tanstack/react-query';
import { sessionQueries } from './queries';

export const useSessionList = () => {
  return useSuspenseQuery(sessionQueries.lists());
};

export const useSessionDetail = (sessionId: number) => {
  return useSuspenseQuery(sessionQueries.details(sessionId));
};
