// import {
//   profileQueries,
// } from './queries';
// import {
//   useMutation,
//   useQuery,
//   useQueryClient,
// } from '@tanstack/react-query';

// export const useProfile = () => {
//   const queryClient = useQueryClient();
//   const query = useQuery(profileQueries.profile());

//   const mutation = useMutation({
//     mutationFn: () => login(),
//     onSuccess: (data, variables, context)  => {
//       setAuth(data.data);
//       queryClient.invalidateQueries({ queryKey: ['list'] });
//     },
//     onError: () => {
//       alert('로그인 에러');
//     }
//   })

//   return { query, mutation };
// };

// export const prefetchUserProfile = async (uid: string) => {
//   const queryClient = new QueryClient();
//   const queryOptions = profileQueries.user(uid);

//   await queryClient.prefetchQuery(queryOptions);

//   return { queryClient };
// };
