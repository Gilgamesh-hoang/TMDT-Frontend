import {createApi} from "@reduxjs/toolkit/query/react";
import {ApiResponse} from "@/types/response.ts";
import {User} from "@/types/models.ts";
import {baseQueryWithAuth} from "@/api/util.ts";

// Request types
export interface EmailRequest {
    email: string;
}

export interface OtpRequest {
    otp: string;
}

export interface UpdateUserRequest {
    fullName?: string;
    phone?: string;
    email?: string;

}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQueryWithAuth,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        // Get current user info
        fetchCurrentUser: builder.query<ApiResponse<User>, void>({
            query: () => "users/me",
            providesTags: ['User'],
        }),

        // Forgot password - send OTP
        forgotPasswordOtp: builder.mutation<ApiResponse<void>, EmailRequest>({
            query: (body) => ({
                url: 'users/forgot-password-opt',
                method: 'POST',
                body,
            }),
        }),

        // Forgot password - verify OTP and get new password
        forgotPassword: builder.mutation<ApiResponse<void>, OtpRequest>({
            query: (body) => ({
                url: 'users/forgot-password',
                method: 'POST',
                body,
            }),
        }),

        // Update user profile
        updateProfile: builder.mutation<ApiResponse<User>, UpdateUserRequest>({
            query: (body) => ({
                url: 'users/profile',
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['User'],
        }),

        // Verify email update with OTP
        verifyEmailUpdate: builder.mutation<ApiResponse<User>, OtpRequest>({
            query: (body) => ({
                url: 'users/verify-email-update',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User'],
        }),

        // Change password
        changePassword: builder.mutation<ApiResponse<void>, ChangePasswordRequest>({
            query: (body) => ({
                url: 'users/change-password',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useFetchCurrentUserQuery,
    useForgotPasswordOtpMutation,
    useForgotPasswordMutation,
    useUpdateProfileMutation,
    useVerifyEmailUpdateMutation,
    useChangePasswordMutation,
} = userApi;