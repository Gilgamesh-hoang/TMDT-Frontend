import {Category, CategoryCreateRequest, CategoryDetail, CategoryUpdateRequest,} from "@/types/category";
import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithAuth, extractData} from "../util";

export const adminCategoryApi = createApi({
  reducerPath: "adminCategoryApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/admin/categories",
      transformResponse: extractData,
      providesTags: ["Category"],
    }),
    getCategoryDetailById: builder.query<CategoryDetail, string>({
      query: (id) => `/admin/categories/${id}/detail`,
      transformResponse: extractData,
      providesTags: ["Category"],
    }),
    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
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
  useDeleteCategoryMutation,
  useGetCategoryDetailByIdQuery
} = adminCategoryApi;
