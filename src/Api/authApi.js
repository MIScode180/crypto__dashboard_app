import {createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react';
import authService from '../appwrite/Auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      queryFn: async ({ email, password, name }) => {
        try {
          const user = await authService.createAccount({ email, password, name });
          return { data: user };
        } catch (error) {
          return { error };
        }
      },
    }),

    loginUser: builder.mutation({
      queryFn: async ({ email, password }) => {
        try {
          const session = await authService.login({ email, password });
          return { data: session };
        } catch (error) {
          return { error };
        }
      },
    }),

    getCurrentUser: builder.query({
      queryFn: async () => {
        try {
          const user = await authService.getCurrentUser();
          return { data: user };
        } catch (error) {
          return { error };
        }
      },
    }),

    logoutUser: builder.mutation({
      queryFn: async () => {
        try {
          await authService.logout();
          return { data: true };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetCurrentUserQuery,
  useLogoutUserMutation,
} = authApi;
