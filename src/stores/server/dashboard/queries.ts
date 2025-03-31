import {
  fetchBoothDashboard,
  fetchBoothDashboardDetails,
  fetchSessionDashboard,
  fetchSessionDashboardDetails,
} from '@api/dashboard-controller';
import { queryOptions } from '@tanstack/react-query';

export const dashboardQueries = {
  all: () => ['dashboard'],
  session: () => [...dashboardQueries.all(), 'session'],
  sessions: () =>
    queryOptions({
      queryKey: [...dashboardQueries.session()],
      queryFn: () => fetchSessionDashboard(),
    }),
  sessionDetail: () =>
    queryOptions({
      queryKey: [...dashboardQueries.session(), 'detail'],
      queryFn: () => fetchSessionDashboardDetails(),
    }),
  booth: () => [...dashboardQueries.all(), 'booth'],
  booths: () =>
    queryOptions({
      queryKey: [...dashboardQueries.booth()],
      queryFn: () => fetchBoothDashboard(),
    }),
  boothDetail: () =>
    queryOptions({
      queryKey: [...dashboardQueries.booth(), 'detail'],
      queryFn: () => fetchBoothDashboardDetails(),
    }),
};
