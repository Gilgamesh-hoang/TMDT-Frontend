import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "@/types/response.ts";
import { AddCartRequest, CartItem, UpdateCartRequest } from "@/types/cart.ts";
import { baseQueryWithAuth } from "@/api/util.ts";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    // GET /cart
    getCart: builder.query<ApiResponse<CartItem[]>, void>({
      query: () => ({
        url: "cart/",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),

    countTotalQuantities: builder.query<ApiResponse<number>, void>({
      query: () => ({
        url: "cart/count",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),

    // POST /cart
    addCart: builder.mutation<ApiResponse<CartItem>, AddCartRequest>({
      query: (request) => ({
        url: "cart/",
        method: "POST",
        body: request,
      }),
      invalidatesTags: ["Cart"], // Invalidate cache của getCart sau khi thêm mới
    }),

    // PUT /cart
    updateCart: builder.mutation<ApiResponse<CartItem>, UpdateCartRequest>({
      query: (request) => ({
        url: "cart/",
        method: "PUT",
        body: request,
      }),
      invalidatesTags: ["Cart"], // Invalidate cache của getCart sau khi cập nhật
    }),

    // DELETE /cart/{itemId}
    deleteCart: builder.mutation<ApiResponse<void>, string>({
      query: (itemId) => ({
        url: `cart/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"], // Invalidate cache của getCart sau khi xóa
    }),

    clearCart: builder.mutation<ApiResponse<void>, void>({
      query: () => ({
        url: "cart/",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddCartMutation,
  useUpdateCartMutation,
  useDeleteCartMutation,
  useClearCartMutation,
  useCountTotalQuantitiesQuery,
} = cartApi;
