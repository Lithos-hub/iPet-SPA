import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: "news",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.newscatcherapi.com/v2/search`,
    prepareHeaders: (headers) => {
      headers.set("x-api-key", import.meta.env.VITE_NEWSCATCHER_API_KEY);
      return headers;
    },
  }),
  tagTypes: ["NEWS"],
  endpoints: (builder) => ({
    getNews: builder.query({
      query: (query: string) =>
        `?q=${query}&sort_by=relevancy&lang=${localStorage.getItem(
          "i18nextLng"
        )}&page_size=[1:3]`,
      providesTags: ["NEWS"],
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
