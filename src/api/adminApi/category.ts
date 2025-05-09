import {
  Category,
  CategoryCreateRequest,
  CategoryUpdateRequest,
} from "@/types/category";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAccessToken, extractData } from "../util";

export const adminCategoryApi = createApi({
  reducerPath: "adminCategoryApi",
  baseQuery: baseQueryWithAccessToken,
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/admin/categories",
      transformResponse: extractData,
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation<Category, CategoryCreateRequest>({
      query: (body) => ({
        url: "/admin/categories",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation<Category, CategoryUpdateRequest>({
      query: (body) => ({
        url: `/admin/categories/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} = adminCategoryApi;
