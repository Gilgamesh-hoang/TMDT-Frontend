import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth, extractData } from "../util";
import {
  CommentCreateRequest,
  CommentReplyRequest,
  CommentResponse,
  CommentUpdateRequest,
} from "@/types/comment";
import { PageResponse } from "@/types/response";
import { PaginationRequest } from "@/types/pagination";

export const commentApi = createApi({
  reducerPath: "commentApi",
  tagTypes: ["Comment"],
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getComments: builder.query<
      PageResponse<CommentResponse[]>,
      PaginationRequest & { productId: string }
    >({
      query: ({ productId, page, size }) => ({
        url: `/products/${productId}/comments`,
        params: { page, size },
      }),
      transformResponse: extractData,
      providesTags: ["Comment"],
    }),
    createComment: builder.mutation<CommentResponse, CommentCreateRequest>({
      query: (body) => ({
        url: "/comments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Comment"],
    }),
    replyComment: builder.mutation<CommentResponse, CommentReplyRequest>({
      query: (body) => ({
        url: `/comments/${body.parentId}/replies`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Comment"],
    }),
    updateComment: builder.mutation<CommentResponse, CommentUpdateRequest>({
      query: (body) => ({
        url: `/comments/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Comment"],
    }),
    deleteComment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useReplyCommentMutation,
} = commentApi;
