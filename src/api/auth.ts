import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ApiResponse, AuthResponse} from "@/types/response.ts";
import {User} from "@/types/models.ts";
import {LoginGoogleRequest, LoginRequest, RegisterRequest} from "@/types/request.ts";
import {ACCESS_TOKEN_LOCALSTORAGE, SERVER_URL} from "@/types/constant.ts";


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: SERVER_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE);
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
        credentials: "include",
    }),
    endpoints: (builder) => ({
        login: builder.mutation<ApiResponse<User>, LoginRequest>({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response: ApiResponse<AuthResponse>): ApiResponse<User> => {
                if (response.data && response.data.accessToken) {
                    localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE, response.data.accessToken);
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
            transformResponse: (response: ApiResponse<AuthResponse>): ApiResponse<User> => {
                if (response.data && response.data.accessToken) {
                    localStorage.setItem(ACCESS_TOKEN_LOCALSTORAGE, response.data.accessToken);
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
              url: '/registration',
              method: 'POST',
              body: userData,
            }),
          }),
          
          verifyEmail: builder.mutation<ApiResponse<void>, string>({
            query: (otp) => ({
              url: `/registration/verify?otp=${otp}`,
              method: 'POST',
            }),
          }),
          
          checkEmailExists: builder.query<ApiResponse<boolean>, string>({
            query: (email) => ({
              url: `/registration/check-email?email=${encodeURIComponent(email)}`,
              method: 'GET',
            }),
          }),
          
    }),
});

export const {useLoginMutation, useLoginGoogleMutation, useLogoutMutation, useRegisterMutation,useVerifyEmailMutation,
    useCheckEmailExistsQuery,} = authApi;