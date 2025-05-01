import { PaginationRequest } from "@/types/pagination.ts";
import { Product } from "@/types/product.ts";
import { ApiResponse, PageResponse } from "@/types/response.ts";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAccessToken } from "../util";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQueryWithAccessToken,
  tagTypes: [
    "Product",
    "NewestProducts",
    "BestSellerProducts",
    "MostViewedProducts",
  ],
  endpoints: (builder) => ({
    getNewestProducts: builder.query<ApiResponse<Product[]>, PaginationRequest>(
      {
        query: ({ page, size }) => ({
          url: "products/newest",
          params: { page, size },
        }),
        providesTags: ["NewestProducts"],
      },
    ),
    getBestSellerProducts: builder.query<
      ApiResponse<Product[]>,
      PaginationRequest
    >({
      query: ({ page, size }) => ({
        url: "products/best-seller",
        params: { page, size },
      }),
      providesTags: ["BestSellerProducts"],
    }),
    getMostViewedProducts: builder.query<
      ApiResponse<Product[]>,
      PaginationRequest
    >({
      query: ({ page, size }) => ({
        url: "products/most-viewed",
        params: { page, size },
      }),
      providesTags: ["MostViewedProducts"],
    }),
    getProductDetail: builder.query<ApiResponse<Product>, string>({
      query: (productId) => ({
        url: `products/${productId}`,
      }),
      providesTags: ["Product"],
    }),
    searchProducts: builder.query<ApiResponse<PageResponse<Product[]>>, string | PaginationRequest>({
      query: (searchParams) => {
        // Xử lý tham số search
        if (typeof searchParams === 'string') {
          return {
            url: `products/quick-search`,
            params: { q: searchParams }
          };
        } else {
          return {
            url: `products/quick-search`,
            params: {
              q: searchParams.search,
              page: searchParams.page,
              size: searchParams.size
            }
          };
        }
      },
    }),
  }),
  
});

export const {
  useGetNewestProductsQuery,
  useGetBestSellerProductsQuery,
  useGetMostViewedProductsQuery,
  useGetProductDetailQuery,
  useSearchProductsQuery
} = productApi;
