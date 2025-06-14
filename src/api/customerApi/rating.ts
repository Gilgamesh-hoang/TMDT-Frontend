import { PaginationRequest } from "@/types/pagination";
import {
  RatingCreateRequest,
  RatingReponse,
  RatingStatsResponse,
} from "@/types/rating";
import { ApiResponse, PageResponse } from "@/types/response";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth, extractData } from "../util";

export const ratingApi = createApi({
  reducerPath: "ratingApi",
  tagTypes: ["Rating"],
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    canRateProduct: builder.query<number, string>({
      query: (productId) => ({
        url: `/ratings/products/${productId}/check-eligibility`,
      }),
      transformResponse: extractData,
    }),
    getRatings: builder.query<
      PageResponse<RatingReponse[]>,
      PaginationRequest & { productId: string; ratingFilter: number }
    >({
      query: ({ productId, page, size, ratingFilter }) => ({
        url: `/products/${productId}/ratings`,
        params: { page, size, ratingFilter },
      }),
      transformResponse: extractData,
      providesTags: ["Rating"],
    }),
    getRatingStats: builder.query<RatingStatsResponse, string>({
      query: (productId) => ({
        url: `/products/${productId}/rating-stats`,
      }),
      transformResponse: (
        response: ApiResponse<RatingStatsResponse>,
      ): RatingStatsResponse => {
        const averageRating = response.data.averageRating;
        const count = response.data.count;
        console.log(response);
        const ratingDistribution = Object.fromEntries(
          Object.entries(response.data.ratingDistribution).map(
            ([key, value]) => [Number(key), value],
          ),
        );
        return {
          averageRating,
          count,
          ratingDistribution,
        };
      },
      providesTags: ["Rating"],
    }),
    createRating: builder.mutation<void, RatingCreateRequest>({
      query: (body) => ({
        url: "/ratings",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Rating"],
    }),
  }),
});

export const {
  useGetRatingsQuery,
  useCreateRatingMutation,
  useGetRatingStatsQuery,
  useCanRateProductQuery,
} = ratingApi;
