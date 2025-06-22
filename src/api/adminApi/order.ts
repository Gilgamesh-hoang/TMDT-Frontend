import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth, extractData } from "../util";
import { OrderSummary, UpdateOrderStatusRequest } from "@/types/order";
import { PageResponse } from "@/types/response";
import { PaginationRequest } from "@/types/pagination";
import { OrderDetail } from "@/pages/admin/manage-order/order-detail/type";

export const adminOrderApi = createApi({
  reducerPath: "adminOrderApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrders: builder.query<PageResponse<OrderSummary[]>, PaginationRequest>({
      query: (params) => ({
        url: "/admin/orders",
        params,
      }),
      transformResponse: extractData,
      providesTags: ["Order"],
    }),
    getOrderDetail: builder.query<OrderDetail, string>({
      query: (id) => `/admin/orders/${id}`,
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

export const {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetOrderDetailQuery,
} = adminOrderApi;
