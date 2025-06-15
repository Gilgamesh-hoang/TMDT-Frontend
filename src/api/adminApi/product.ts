import { PaginationRequest } from "@/types/pagination";
import {
  Product,
  ProductCreateRequest,
  ProductSummaryResponse,
} from "@/types/product.ts";
import { ApiResponse, PageResponse } from "@/types/response.ts";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth, extractData } from "../util";
import { ProductUpdateRequest } from "@/pages/admin/manage-product/formSchema";

export const adminProductApi = createApi({
  reducerPath: "adminProductApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProductDetail: builder.query<ApiResponse<Product>, string>({
      query: (productId) => ({
        url: `/admin/products/${productId}`,
      }),
      providesTags: ["Product"],
    }),
    getDeletedProductCount: builder.query<number, void>({
      query: () => "/admin/products/deleted/count",
      providesTags: ["Product"],
      transformResponse:extractData
    }),
    getDeletedProducts: builder.query<ProductSummaryResponse[], void>({
      query: () => "/admin/products/deleted",
      providesTags: ["Product"],
      transformResponse: extractData,
    }),
    getProducts: builder.query<
      PageResponse<ProductSummaryResponse[]>,
      PaginationRequest & { q: string | null }
    >({
      query: (page) => ({
        url: "/admin/products",
        params: page,
      }),
      providesTags: ["Product"],
      transformResponse: extractData,
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (productId) => ({
        url: `/admin/products/${productId}`,
        method: "delete",
      }),
      invalidatesTags: ["Product"],
    }),
    recoverProduct: builder.mutation<void, string>({
      query: (productId) => ({
        url: `/admin/products/${productId}/recover`,
        method: "post",
      }),
      invalidatesTags: ["Product"],
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
    updateProduct: builder.mutation<void, ProductUpdateRequest>({
      query: (body) => ({
        url: `/admin/products/${body.id}`,
        method: "put",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
    updateImages: builder.mutation<
      void,
      { productId: string; imageIds: string[]; thumbnail: string }
    >({
      query: (body) => ({
        url: `/admin/products/${body.productId}/images`,
        method: "put",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductDetailQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetDeletedProductsQuery,
  useRecoverProductMutation,
  useGetDeletedProductCountQuery,
  useUpdateProductMutation,
  useUpdateImagesMutation,
} = adminProductApi;
