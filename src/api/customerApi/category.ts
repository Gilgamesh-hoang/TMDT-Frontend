import {Category} from "@/types/category";
import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithAuth, extractData} from "../util";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      transformResponse: extractData,
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
