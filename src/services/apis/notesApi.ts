import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Note } from "../../models/interfaces/Note";

export const notesApi = createApi({
  reducerPath: "notes",
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
  tagTypes: ["Note"],
  endpoints: (builder) => ({
    createNote: builder.mutation({
      query: (body) => ({
        url: "user/note",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Note"],
    }),
    updateNote: builder.mutation({
      query: (body) => ({
        url: `user/note/${body._id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Note"],
    }),
    deleteNote: builder.mutation({
      query: (body) => ({
        url: `user/note/${body._id}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Note"],
    }),
  }),
});

export const {
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;
