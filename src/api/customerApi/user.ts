import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ApiResponse} from "@/types/response.ts";
import {User} from "@/types/models.ts";
import {ACCESS_TOKEN_LOCALSTORAGE, SERVER_URL} from "@/types/constant.ts";


export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: SERVER_URL + '/users',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE);
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        fetchCurrentUser: builder.query<ApiResponse<User>, void>({
            query: () => "/me",
        }),

        forgotPasswordOtp: builder.mutation<ApiResponse<void>, { email: string }>({
            query: (body) => ({
                url: '/forgot-password-opt',
                method: 'POST',
                body,
            }),
        }),

        forgotPassword: builder.mutation<ApiResponse<void>, { otp: string }>({
            query: (body) => ({
                url: '/forgot-password',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {useFetchCurrentUserQuery, useForgotPasswordOtpMutation, useForgotPasswordMutation} = userApi;