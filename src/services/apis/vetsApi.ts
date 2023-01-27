import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Vet } from "../../models/interfaces/Vet";

export const vetsApi = createApi({
  reducerPath: "vets",
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
  tagTypes: ["Vet"],
  endpoints: (builder) => ({
    createVet: builder.mutation({
      query: (body) => ({
        url: "user/vet",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Vet"],
    }),
    updateVet: builder.mutation({
      query: (body) => ({
        url: `user/vet/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Vet"],
    }),
    deleteVet: builder.mutation({
      query: (id) => ({
        url: `user/vet/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Vet"],
    }),
  }),
});

export const {
  useCreateVetMutation,
  useUpdateVetMutation,
  useDeleteVetMutation,
} = vetsApi;
