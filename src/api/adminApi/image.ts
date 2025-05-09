import { ImageResponse } from "@/types/image";
import { PaginationRequest } from "@/types/pagination";
import { ApiResponse, PageResponse } from "@/types/response.ts";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAccessToken, extractData } from "../util";

export const adminImageApi = createApi({
  reducerPath: "adminImageApi",
  baseQuery: baseQueryWithAccessToken,
  tagTypes: ["Image"],
  endpoints: (builder) => ({
    getImages: builder.query<PageResponse<ImageResponse[]>, PaginationRequest>({
      query: (page) => ({
        url: "/admin/media",
        params: page,
      }),
      providesTags: ["Image"],
      transformResponse: extractData,
    }),
    uploadImage: builder.mutation<
      ApiResponse<{ url: string; id: string }>,
      File
    >({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: "/admin/media/upload",
          method: "post",
          body: formData,
        };
      },
      invalidatesTags: ["Image"],
    }),
  }),
});

export const { useUploadImageMutation, useGetImagesQuery } = adminImageApi;
