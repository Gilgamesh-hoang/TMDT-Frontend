import { PaginationRequest } from "@/types/pagination";
import { Product, ProductCreateRequest } from "@/types/product.ts";
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
        url: `/admin/products/${productId}`,
      }),
      providesTags: ["Product"],
    }),
    getProducts: builder.query<
      ApiResponse<PageResponse<Product[]>>,
      PaginationRequest
    >({
      query: (page) => ({
        url: "/admin/products",
        params: page,
      }),
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation<ApiResponse<Product>, ProductCreateRequest>(
      {
        query: (body) => ({
          url: "/admin/products",
          method: "post",
          body,
        }),
        invalidatesTags: ["Product"],
      },
    ),
  }),
});

export const {
  useGetProductDetailQuery,
  useGetProductsQuery,
  useCreateProductMutation,
} = adminProductApi;
