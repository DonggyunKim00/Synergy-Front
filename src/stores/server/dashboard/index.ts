import { useSuspenseQuery } from '@tanstack/react-query';
import { dashboardQueries } from './queries';

export const useDashboardSessions = () => {
  return useSuspenseQuery(dashboardQueries.sessions());
};

export const useDashboardSessionDetail = () => {
  return useSuspenseQuery(dashboardQueries.sessionDetail());
};

export const useDashboardBooths = () => {
  return useSuspenseQuery(dashboardQueries.booths());
};

export const useDashboardBoothDetail = () => {
  return useSuspenseQuery(dashboardQueries.boothDetail());
};
