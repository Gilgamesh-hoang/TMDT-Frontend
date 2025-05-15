import {ACCESS_TOKEN_LOCALSTORAGE} from "@/types/constant.ts";
import {User} from "@/types/models.ts";
import {LoginGoogleRequest, LoginRequest, RegisterRequest,} from "@/types/request.ts";
import {ApiResponse, AuthResponse} from "@/types/response.ts";
import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithAuth} from "./util";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<User>, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (
        response: ApiResponse<AuthResponse>,
      ): ApiResponse<User> => {
        if (response.data && response.data.accessToken) {
          localStorage.setItem(
            ACCESS_TOKEN_LOCALSTORAGE,
            response.data.accessToken,
          );
        }
        return {
          status: response.status,
          message: response.message,
          data: response.data.user,
        };
      },
    }),

    loginGoogle: builder.mutation<ApiResponse<User>, LoginGoogleRequest>({
      query: (credentials) => ({
        url: "/auth/google",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (
        response: ApiResponse<AuthResponse>,
      ): ApiResponse<User> => {
        if (response.data && response.data.accessToken) {
          localStorage.setItem(
            ACCESS_TOKEN_LOCALSTORAGE,
            response.data.accessToken,
          );
        }
        return {
          status: response.status,
          message: response.message,
          data: response.data.user,
        };
      },
    }),
    logout: builder.mutation<ApiResponse<void>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          localStorage.removeItem(ACCESS_TOKEN_LOCALSTORAGE);
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
    }),

    register: builder.mutation<ApiResponse<User>, RegisterRequest>({
      query: (userData) => ({
        url: "/registration",
        method: "POST",
        body: userData,
      }),
    }),

    verifyEmail: builder.mutation<ApiResponse<void>, string>({
      query: (otp) => ({
        url: `/registration/verify?otp=${otp}`,
        method: "POST",
      }),
    }),

    checkEmailExists: builder.query<ApiResponse<boolean>, string>({
      query: (email) => ({
        url: `/registration/check-email?email=${encodeURIComponent(email)}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLoginGoogleMutation,
  useLogoutMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useCheckEmailExistsQuery,
} = authApi;
