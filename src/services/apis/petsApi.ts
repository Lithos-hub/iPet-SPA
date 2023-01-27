import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const petsApi = createApi({
  reducerPath: "pets",
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
  tagTypes: ["Pet"],
  endpoints: (builder) => ({
    createPet: builder.mutation({
      query: (body) => ({
        url: "user/pet",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Pet"],
    }),
    updatePet: builder.mutation({
      query: (body) => ({
        url: `user/pet/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Pet"],
    }),
    deletePet: builder.mutation({
      query: (id: number) => ({
        url: `user/pet/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Pet"],
    }),
  }),
});

export const {
  useCreatePetMutation,
  useUpdatePetMutation,
  useDeletePetMutation,
} = petsApi;
