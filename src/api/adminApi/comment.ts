import { AdminCommentResponse } from "@/types/comment";
import { PaginationRequest } from "@/types/pagination";
import { PageResponse } from "@/types/response";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth, extractData } from "../util";
export const adminCommentApi = createApi({
  reducerPath: "adminCommentApi",
  tagTypes: ["AdminComment"],
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getAdminComments: builder.query<
      PageResponse<AdminCommentResponse[]>,
      PaginationRequest
    >({
      query: ({ page, size }) => ({
        url: `/admin/comments`,
        params: { page, size },
      }),
      transformResponse: extractData,
      providesTags: ["AdminComment"],
    }),
    deleteAdminComment: builder.mutation<void, string>({
      query: (id) => ({
        url: `admin/comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminComment"],
    }),
  }),
});

export const { useGetAdminCommentsQuery, useDeleteAdminCommentMutation } =
  adminCommentApi;
