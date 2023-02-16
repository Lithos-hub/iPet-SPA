import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: "news",
  baseQuery: fetchBaseQuery({}),
  tagTypes: ["NEWS"],
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => ({
        url: `
        https://newsapi.ai/api/v1/article/getArticles?query=
        {"$query":{"$and":[{"$and":[{"keyword":"${
          localStorage.getItem("i18nextLng") === "es" ? "mascota" : "pet"
        }","keywordLoc":"body"},{"keyword":"${
          localStorage.getItem("i18nextLng") === "es" ? "mascotas" : "pets"
        }","keywordLoc":"body"}]},{"lang":"${
          localStorage.getItem("i18nextLng") === "es" ? "spa" : "eng"
        }"}]},"$filter":{"forceMaxDataTimeWindow":"31"}}&resultType=articles&articlesSortBy=date&articlesCount=100&articleBodyLen=-1&apiKey=${
          import.meta.env.VITE_NEWSAPI_API_KEY
        }`,
        method: "GET",
      }),
      providesTags: ["NEWS"],
    }),
    getTips: builder.query({
      query: () => ({
        url: `https://newsapi.ai/api/v1/article/getArticles?query={"$query":{"$and":[{"$and":[{"keyword":"${
          localStorage.getItem("i18nextLng") === "es" ? "mascotas" : "pet"
        }","keywordLoc":"body"},{"keyword":"tips","keywordLoc":"body"}]},{"lang":"${
          localStorage.getItem("i18nextLng") === "es" ? "spa" : "eng"
        }"}]},"$filter":{"forceMaxDataTimeWindow":"31","dataType":["blog"]}}&resultType=articles&articlesSortBy=date&articlesCount=10&articleBodyLen=-1&apiKey=${
          import.meta.env.VITE_NEWSAPI_API_KEY
        }`,
        method: "GET",
      }),
      providesTags: ["NEWS"],
    }),
  }),
});

export const { useGetNewsQuery, useGetTipsQuery } = newsApi;
