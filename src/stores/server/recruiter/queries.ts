import {
  fetchAttendeesList,
  postLikeAttendee,
  deleteUnlikeAttendee,
  fetchRecruiterInfo,
  fetchLikedAttendees,
} from '@api/recruiter-controller';
import { QueryClient, queryOptions, useMutation } from '@tanstack/react-query';

export const recruiterQueries = {
  all: () => ['recruiter'],
  attendees: (recruiterId: number, filters?: Record<string, any>) =>
    queryOptions({
      queryKey: [...recruiterQueries.all(), recruiterId, 'attendees', filters],
      queryFn: () => fetchAttendeesList(recruiterId, filters),
    }),
  likeAttendee: (attendeeId: number) =>
    useMutation({
      mutationFn: () => postLikeAttendee(attendeeId),
    }),
  deleteAttendee: (attendeeId: number) =>
    useMutation({
      mutationFn: () => deleteUnlikeAttendee(attendeeId),
    }),
  profile: (recruiterId: number) =>
    queryOptions({
      queryKey: [...recruiterQueries.all(), 'profile', recruiterId],
      queryFn: () => fetchRecruiterInfo(),
    }),
  liked: (recruiterId: number) =>
    queryOptions({
      queryKey: [...recruiterQueries.all(), 'liked', recruiterId],
      queryFn: () => fetchLikedAttendees(),
    }),
};
