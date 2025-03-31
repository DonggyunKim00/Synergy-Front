import { fetchConferenceUsers } from '@api/conference-controller';
import { createConference } from '@api/conference-controller/createConference';
import { queryOptions } from '@tanstack/react-query';

export const createConferenceQuery = {
  queryKey: ['createConference'],
  queryFn: createConference,
};

export const conferenceQueries = {
  all: () => ['conference'],
  users: () =>
    queryOptions({
      queryKey: [...conferenceQueries.all(), 'users'],
      queryFn: () => fetchConferenceUsers(),
    }),
};
