import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponse, PageResponse } from "@/types/response.ts";
import { 

  UserOrderSummaryResponse, 
  UserOrderDetailResponse,
  GetUserOrdersParams,

} from "@/types/order.ts";
import { baseQueryWithAuth } from "@/api/util.ts";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Order", "OrderDetail"],
  endpoints: (builder) => ({
    //Lấy danh sách đơn hàng với filter
    getMyOrders: builder.query<
      ApiResponse<PageResponse<UserOrderSummaryResponse[]>>, 
      GetUserOrdersParams
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        
        if (params.status) searchParams.append("status", params.status);
        if (params.page !== undefined) searchParams.append("page", params.page.toString());
        if (params.size !== undefined) searchParams.append("size", params.size.toString());
        if (params.sortBy) searchParams.append("sortBy", params.sortBy);
        if (params.sortDirection) searchParams.append("sortDirection", params.sortDirection);

        return {
          url: `orders/my-orders?${searchParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Order"],
    }),

    // Lấy đơn hàng theo trạng thái cụ thể- chưa dùng
    getMyOrdersByStatus: builder.query<
      ApiResponse<PageResponse<UserOrderSummaryResponse[]>>, 
      { status: string; page?: number; size?: number }
    >({
      query: ({ status, page = 0, size = 10 }) => ({
        url: `orders/my-orders/status/${status}?page=${page}&size=${size}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),

    // Xem chi tiết đơn hàng
    getMyOrderDetail: builder.query<
      ApiResponse<UserOrderDetailResponse>, 
      string
    >({
      query: (orderId) => ({
        url: `orders/my-orders/${orderId}`,
        method: "GET",
      }),
      providesTags: (result, error, orderId) => [
        { type: "OrderDetail", id: orderId }
      ],
    }),

    //Hủy đơn hàng
    cancelMyOrder: builder.mutation<
      ApiResponse<string>, 
      string
    >({
      query: (orderId) => ({
        url: `orders/my-orders/${orderId}/cancel`,
        method: "PUT",
      }),
      invalidatesTags: ["Order", "OrderDetail"], 
    }),

    
    
  }),
});

export const {
  useGetMyOrdersQuery,
  useGetMyOrdersByStatusQuery,
  useGetMyOrderDetailQuery,
  useCancelMyOrderMutation,
  
} = orderApi;