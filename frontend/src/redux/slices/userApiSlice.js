import { USER_URL } from '../constants/constants';
import { apiSlice } from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: USER_URL + '/signup',
        method: 'POST',
        body: data,
      }),
    }),

    signIn: builder.mutation({
      query: (data) => ({
        url: USER_URL + '/login',
        method: 'POST',
        body: data,
      }),
    }),

    getProfil: builder.query({
      query: (token) => ({
        url: `${USER_URL}/profile`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      keepUnusedDataFor: 5,
    }),

    updateProfil: builder.mutation({
      query: (data) => ({
        url: USER_URL + '/profile',
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useGetProfilQuery,
  useUpdateProfilMutation,
} = userApiSlice;
