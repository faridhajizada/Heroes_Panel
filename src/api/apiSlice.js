import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }),
  tagTypes: ["Heroes"],
  endpoints: (builder) => ({
    getHeroes: builder.query({
      query: () => "/heroes",
      providesTags: ["Heroes"],
    }),
    createHeroes: builder.mutation({
      query: (heroes) => ({
        url: "/heroes",
        method: "POST",
        body: heroes,
      }),
      invalidatesTags: ["Heroes"],
    }),
    deleteHeroes: builder.mutation({
      query: (id) => ({
        url: `/heroes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Heroes"],
    }),
  }),
});

export const {
  useGetHeroesQuery,
  useCreateHeroesMutation,
  useDeleteHeroesMutation,
} = apiSlice;
