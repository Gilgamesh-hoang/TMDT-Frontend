import { ACCESS_TOKEN_LOCALSTORAGE, SERVER_URL } from "@/types/constant.ts";
import { User } from "@/types/models";
import { ApiResponse, AuthResponse } from "@/types/response";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const baseQueryWithAccessToken = fetchBaseQuery({
  baseUrl: SERVER_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE);
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include",
});
export const transformToApiResponse = (
  response: ApiResponse<AuthResponse>,
): ApiResponse<User> => {
  if (response.data && response.data.accessToken) {
    localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE, response.data.accessToken);
  }
  return {
    status: response.status,
    message: response.message,
    data: response.data.user,
  };
};
export const extractData = <T>(response: ApiResponse<T>): T => response.data;
