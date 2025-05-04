import { PaginationRequest } from "@/types/pagination";
import { Product } from "@/types/product.ts";
import { ApiResponse, PageResponse } from "@/types/response.ts";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAccessToken } from "../util";

export const adminProductApi = createApi({
  reducerPath: "adminProductApi",
  baseQuery: baseQueryWithAccessToken,
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProductDetail: builder.query<ApiResponse<Product>, string>({
      query: (productId) => ({
        url: `products/${productId}`,
      }),
      providesTags: ["Product"],
    }),
    getProducts: builder.query<
      ApiResponse<PageResponse<Product[]>>,
      PaginationRequest
    >({
      query: (page) => ({
        url: "products",
        params: page,
      }),
    }),
  }),
});

export const { useGetProductDetailQuery, useGetProductsQuery } =
  adminProductApi;
