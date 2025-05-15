import {createApi} from "@reduxjs/toolkit/query/react";
import {ApiResponse} from "@/types/response.ts";
import {User} from "@/types/models.ts";
import {baseQueryWithAuth} from "@/api/util.ts";


export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        fetchCurrentUser: builder.query<ApiResponse<User>, void>({
            query: () => "users/me",
        }),

        forgotPasswordOtp: builder.mutation<ApiResponse<void>, { email: string }>({
            query: (body) => ({
                url: 'users/forgot-password-opt',
                method: 'POST',
                body,
            }),
        }),

        forgotPassword: builder.mutation<ApiResponse<void>, { otp: string }>({
            query: (body) => ({
                url: 'users/forgot-password',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {useFetchCurrentUserQuery, useForgotPasswordOtpMutation, useForgotPasswordMutation} = userApi;