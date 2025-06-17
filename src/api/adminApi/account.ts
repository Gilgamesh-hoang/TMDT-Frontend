import { AdminAccountResponse } from "@/types/models";
import { PaginationRequest } from "@/types/pagination";
import { PageResponse } from "@/types/response";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth, extractData } from "../util";

export const adminAccountApi = createApi({
  reducerPath: "adminAccountApi",
  tagTypes: ["AdminAccount"],
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getCustomerAccounts: builder.query<
      PageResponse<AdminAccountResponse[]>,
      PaginationRequest
    >({
      query: (params) => ({
        url: "/admin/accounts/customer",
        params,
      }),
      transformResponse: extractData,
      providesTags: ["AdminAccount"],
    }),
    getEmployeeAccounts: builder.query<
      PageResponse<AdminAccountResponse[]>,
      PaginationRequest
    >({
      query: (params) => ({
        url: "/admin/accounts/employee",
        params,
      }),
      transformResponse: extractData,
      providesTags: ["AdminAccount"],
    }),
  }),
});

export const { useGetCustomerAccountsQuery, useGetEmployeeAccountsQuery } =
  adminAccountApi;
