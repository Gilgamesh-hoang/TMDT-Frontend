import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ApiResponse} from "@/types/response.ts";
import {User} from "@/types/models.ts";
import {ACCESS_TOKEN_LOCALSTORAGE, SERVER_URL} from "@/types/constant.ts";


export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: SERVER_URL,
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
            query: () => "/users/me",
        }),
    }),
});

export const { useFetchCurrentUserQuery } = userApi;