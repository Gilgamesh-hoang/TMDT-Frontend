import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAccessToken, extractData } from "../util";
import { OrderSummary, UpdateOrderStatusRequest } from "@/types/order";
import { PageResponse } from "@/types/response";
import { PaginationRequest } from "@/types/pagination";

export const adminOrderApi = createApi({
  reducerPath: "adminOrderApi",
  baseQuery: baseQueryWithAccessToken,
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrders: builder.query<PageResponse<OrderSummary[]>, PaginationRequest>({
      query: () => "/admin/orders",
      transformResponse: extractData,
      providesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation<OrderSummary, UpdateOrderStatusRequest>(
      {
        query: ({ orderId, status }) => ({
          url: `/admin/orders/${orderId}`,
          method: "PUT",
          body: { status },
        }),
        transformResponse: extractData,
        invalidatesTags: ["Order"],
      },
    ),
  }),
});

export const { useGetOrdersQuery, useUpdateOrderStatusMutation } =
  adminOrderApi;
