import {
    CategoryRevenue,
  ChartFilterOptions,
  DashboardResponse,
  MonthlyRevenue,
  RevenueItem,
} from "@/types/dashboard";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth, extractData } from "../util";

export const adminDashboardApi = createApi({
  reducerPath: "adminDashboardApi",
  tagTypes: ["Dashboard"],
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getDashboard: builder.query<DashboardResponse, void>({
      query: () => "/admin/dashboard",
      transformResponse: extractData,
      providesTags: ["Dashboard"],
    }),
    getRevenueByCategory: builder.query<
      CategoryRevenue[],
      { month: number; year: number }
    >({
      query: (params) => ({
        url: "/admin/stats/revenue-by-category",
        params,
      }),
      providesTags: ["Dashboard"],
      transformResponse: extractData,
    }),
    getRevenueByTime: builder.query<RevenueItem[], ChartFilterOptions>({
      query: (params) => ({
        url: "/admin/stats/revenue",
        params,
      }),
      providesTags: ["Dashboard"],
      transformResponse: extractData,
    }),
    getMonthlyRevenue: builder.query<MonthlyRevenue[], void>({
      query: () => "/admin/dashboard/revenue/monthly",
      providesTags: ["Dashboard"],
    }),
    getDailyOrderCount: builder.query<number[], void>({
      query: () => "/admin/dashboard/daily-order",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useGetMonthlyRevenueQuery,
  useGetDailyOrderCountQuery,
  useGetRevenueByTimeQuery,
  useGetRevenueByCategoryQuery
} = adminDashboardApi;
