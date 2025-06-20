import { AdminAccountResponse, CustomerDetailResponse } from "@/types/models";
import { PaginationRequest } from "@/types/pagination";
import { PageResponse } from "@/types/response";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth, extractData } from "../util";
import { EmployeeResgisterRequest } from "@/pages/admin/manage-employee-account/formSchema";

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
    getCustomerDetail: builder.query<CustomerDetailResponse, string>({
      query: (userId) => `/admin/accounts/customer/${userId}`,
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
    registerEmployee: builder.mutation<void, EmployeeResgisterRequest>({
      query: (body) => ({
        url: `/admin/accounts/employee/register`,
        method: "post",
        body,
      }),
      invalidatesTags: ["AdminAccount"],
    }),
    banAccount: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/admin/accounts/customer/${userId}/ban`,
        method: "post",
      }),
      invalidatesTags: ["AdminAccount"],
    }),
    unbanAccount: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/admin/accounts/customer/${userId}/unban`,
        method: "post",
      }),
      invalidatesTags: ["AdminAccount"],
    }),
  }),
});

export const {
  useGetCustomerAccountsQuery,
  useGetEmployeeAccountsQuery,
  useBanAccountMutation,
  useUnbanAccountMutation,
  useGetCustomerDetailQuery,
  useRegisterEmployeeMutation
} = adminAccountApi;
