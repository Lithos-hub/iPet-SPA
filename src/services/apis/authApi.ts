import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/v1/`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("x-token", token);
      }
      return headers;
    },
  }),
  tagTypes: ["Session"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Session"],
    }),
    join: builder.mutation({
      query: (body) => ({
        url: `auth/join`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Session"],
    }),
    session: builder.mutation({
      query: () => {
        return {
          url: `auth/session`,
          method: "POST",
          body: {
            _id: localStorage.getItem("id"),
          },
        };
      },
      invalidatesTags: ["Session"],
    }),
  }),
});

export const { useLoginMutation, useJoinMutation, useSessionMutation } =
  authApi;
