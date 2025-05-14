import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAccessToken, extractData } from "../util";
import { OrderSummaryResponse } from "@/types/order";
import { PageResponse } from "@/types/response";
import { PaginationRequest } from "@/types/pagination";

export const adminOrderApi = createApi({
  reducerPath: "adminOrderApi",
  baseQuery: baseQueryWithAccessToken,
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrders: builder.query<
      PageResponse<OrderSummaryResponse[]>,
      PaginationRequest
    >({
      query: () => "/admin/orders",
      transformResponse: extractData,
      providesTags: ["Order"],
    }),
  }),
});

export const { useGetOrdersQuery } = adminOrderApi;
