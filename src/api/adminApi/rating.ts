import { PaginationRequest } from "@/types/pagination";
import { AdminRatingReponse } from "@/types/rating";
import { PageResponse } from "@/types/response";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth, extractData } from "../util";

export const adminRatingApi = createApi({
  reducerPath: "adminRatingApi",
  tagTypes: ["AdminRating"],
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    deleteAdminRating: builder.mutation<void, string>({
      query: (ratingId) => ({
        url: `admin/ratings/${ratingId}`,
        method: "delete",
      }),
      invalidatesTags: ["AdminRating"],
    }),
    getAdminRatings: builder.query<
      PageResponse<AdminRatingReponse[]>,
      PaginationRequest
    >({
      query: (params) => ({
        url: "/admin/ratings",
        params,
      }),
      transformResponse: extractData,
      providesTags: ["AdminRating"],
    }),
  }),
});

export const { useGetAdminRatingsQuery, useDeleteAdminRatingMutation } =
  adminRatingApi;
