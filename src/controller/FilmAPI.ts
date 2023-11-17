import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { HEADERS, REQUEST_URL } from '../common/constants';
import { RequestAns, RequestAnsOneFilm, RespParam } from '../types/types';

export const filmApi = createApi({
  reducerPath: 'filmApi',
  baseQuery: fetchBaseQuery({ baseUrl: REQUEST_URL, headers: HEADERS }),
  endpoints: (builder) => ({
    getMoviePage: builder.query<RequestAns, RespParam>({
      query: ({ searchValue, page, limit }) => {
        if (searchValue)
          return `/search/title/${searchValue}?page=${page}&limit=${limit}`;
        return `?page=${page}&limit=${limit}`;
      },
    }),
    getMovie: builder.query<RequestAnsOneFilm, string>({
      query: (id: string) => `/${id}`,
    }),
  }),
});

export const { useGetMoviePageQuery, useGetMovieQuery } = filmApi;
