import {
  fetchMyProfile,
  fetchAttendeeDetailInfo,
  fetchLinkedRecruiters,
} from '@api/attendee-controller';
import { fetchMyPoints } from '@api/point-controller/fetchMyPoints';
import { queryOptions } from '@tanstack/react-query';

export const attendeeQueries = {
  all: () => ['attendee'],
  user: (identifier: string | null) => [...attendeeQueries.all(), identifier],
  users: (identifier: string | null) =>
    queryOptions({
      queryKey: [...attendeeQueries.user(identifier)],
      queryFn: () => fetchMyProfile(),
    }),
  points: (identifier: string | null) =>
    queryOptions({
      queryKey: [...attendeeQueries.user(identifier), 'my-point'],
      queryFn: () => fetchMyPoints(),
    }),
  linkedRecruiters: (identifier: string | null) =>
    queryOptions({
      queryKey: [...attendeeQueries.user(identifier), 'linked-recruiters'],
      queryFn: () => fetchLinkedRecruiters(),
    }),
  detailInfo: (id: number | null) =>
    queryOptions({
      queryKey: ['detail-info', id],
      queryFn: () => fetchAttendeeDetailInfo(id),
    }),
};
