import { Product } from "@/types/product.ts";
import { ApiResponse } from "@/types/response.ts";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAccessToken } from "../util";

export const adminCategoryApi = createApi({
  reducerPath: "adminCategoryApi",
  baseQuery: baseQueryWithAccessToken,
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<ApiResponse<Product[]>, void>({
      query: () => "/admin/categories",
    }),
  }),
});

export const { useGetCategoriesQuery } = adminCategoryApi;
