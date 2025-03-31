import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { recruiterQueries } from './queries';
import { useAuthStore } from '@stores/client/useAuthStore';
import { deleteUnlikeAttendee, postLikeAttendee } from '@api/recruiter-controller';

export const useRecruiterAttendees = (
  filters?: {
    page?: number;
    size?: number;
    sort?: string[];
    occupations?: string;
    educationLevel?: string;
    ageGroup?: string;
    experienceLevel?: string;
    regions?: string;
    liked?: boolean;
    [key: string]: any;
  }
) => {
  const { id } = useAuthStore.getState().user;
  if (!id) {
    throw new Error('User ID is not available');
  }
  return useSuspenseQuery(recruiterQueries.attendees(id, filters));
};

export const useLikeAttendee = () => {
  const queryClinet = useQueryClient();
  const { id } = useAuthStore.getState().user;
  if (!id) {
    throw new Error('User ID is not available');
  }
  return useMutation({
    mutationFn: (attendeeId: number) => postLikeAttendee(attendeeId),
    onSettled: () => {
      queryClinet.invalidateQueries({
        queryKey: recruiterQueries.attendees(id, {}),
      });
    },
  });
};

export const useUnlikeAttendee = () => {
  const queryClinet = useQueryClient();
  const {id} = useAuthStore.getState().user;
  if(!id){
    throw new Error('User ID is not available');
  }
  return useMutation({
    mutationFn: (attendeeId: number) => deleteUnlikeAttendee(attendeeId),
    onSettled: () => {
      queryClinet.invalidateQueries({
        queryKey: recruiterQueries.attendees(id, {}),
      });
    },
  });
};

export const useRecruiterProfile = () => {
  const { id } = useAuthStore.getState().user;
  if(!id){
    throw new Error('User ID is not available');
  }
  return useSuspenseQuery(recruiterQueries.profile(id));
};

export const useLikedAttendee = () => {
  const { id } = useAuthStore.getState().user;
  if(!id){
    throw new Error('User ID is not available');
  }
  return useSuspenseQuery(recruiterQueries.liked(id));
}