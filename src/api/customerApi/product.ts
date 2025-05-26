import { PaginationRequest } from "@/types/pagination.ts";
import { Product, ProductFilterDTO, ProductSummaryResponse, SearchFilterRequest } from "@/types/product.ts";
import { ApiResponse, PageResponse } from "@/types/response.ts";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../util";


export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: [
    "Product",
    "NewestProducts",
    "BestSellerProducts",
    "MostViewedProducts",
  ],
  endpoints: (builder) => ({
    getNewestProducts: builder.query<
      ApiResponse<ProductSummaryResponse[]>,
      PaginationRequest
    >({
      query: ({ page, size }) => ({
        url: "products/newest",
        params: { page, size },
      }),
      providesTags: ["NewestProducts"],
    }),
    getBestSellerProducts: builder.query<
      ApiResponse<ProductSummaryResponse[]>,
      PaginationRequest
    >({
      query: ({ page, size }) => ({
        url: "products/best-seller",
        params: { page, size },
      }),
      providesTags: ["BestSellerProducts"],
    }),
    getMostViewedProducts: builder.query<
      ApiResponse<ProductSummaryResponse[]>,
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
    searchProducts: builder.query<
      ApiResponse<PageResponse<ProductSummaryResponse[]>>,
      string | PaginationRequest
    >({
      query: (searchParams) => {
        // Xử lý tham số search
        if (typeof searchParams === "string") {
          return {
            url: `products/quick-search`,
            params: { q: searchParams },
          };
        } else {
          return {
            url: `products/quick-search`,
            params: {
              q: searchParams.search,
              page: searchParams.page,
              size: searchParams.size,
            },
          };
        }
      },
    }),
    filterProducts: builder.query<
      ApiResponse<PageResponse<ProductSummaryResponse[]>>,
      { filter: ProductFilterDTO; page: number; size: number }
    >({
      query: ({ filter, page, size }) => ({
        url: "products/filter",
        method: "POST",
        body: filter,
        params: { page, size },
      }),
    }),
   
    searchFilterProducts: builder.query<
      ApiResponse<PageResponse<ProductSummaryResponse[]>>,
      SearchFilterRequest
    >({
      query: ({ search, filter, page, size }) => ({
        url: "products/search-filter",
        method: "POST",
        body: filter,
        params: { q: search, page, size },
      }),
    }),
    

  }),
});

export const {
  useGetNewestProductsQuery,
  useGetBestSellerProductsQuery,
  useGetMostViewedProductsQuery,
  useGetProductDetailQuery,
  useSearchProductsQuery,
   useSearchFilterProductsQuery,
} = productApi;
