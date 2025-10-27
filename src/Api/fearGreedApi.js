import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fearGreedApi = createApi({
  reducerPath: "fearGreedApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.alternative.me/fng/",
  }),
  endpoints: (builder) => ({
    getFearGreedIndex: builder.query({
      query: () => "?limit=1&format=json",
    }),
  }),
});

export const { useGetFearGreedIndexQuery } = fearGreedApi;
