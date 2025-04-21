import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ACCESS_TOKEN_LOCALSTORAGE, SERVER_URL} from "@/types/constant.ts";
import {ApiResponse} from "@/types/response.ts";
import {AddCartRequest, CartItem, UpdateCartRequest} from "@/types/cart.ts";


export const cartApi = createApi({
    reducerPath: "cartApi",
    baseQuery: fetchBaseQuery({
        baseUrl: SERVER_URL + '/cart',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE);
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        // GET /cart
        getCart: builder.query<ApiResponse<CartItem[]>, void>({
            query: () => ({
                url: '/',
                method: 'GET',
            }),
            providesTags: ['Cart'],
        }),

        // POST /cart
        addCart: builder.mutation<ApiResponse<CartItem>, AddCartRequest>({
            query: (request) => ({
                url: '/',
                method: 'POST',
                body: request,
            }),
            invalidatesTags: ['Cart'], // Invalidate cache của getCart sau khi thêm mới
        }),

        // PUT /cart
        updateCart: builder.mutation<ApiResponse<CartItem>, UpdateCartRequest>({
            query: (request) => ({
                url: '/',
                method: 'PUT',
                body: request,
            }),
            invalidatesTags: ['Cart'], // Invalidate cache của getCart sau khi cập nhật
        }),

        // DELETE /cart/{itemId}
        deleteCart: builder.mutation<ApiResponse<void>, string>({
            query: (itemId) => ({
                url: `/${itemId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'], // Invalidate cache của getCart sau khi xóa
        }),

        clearCart: builder.mutation<ApiResponse<void>, void>({
            query: () => ({
                url: '/',
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),
    }),
});

export const {
    useGetCartQuery,
    useAddCartMutation,
    useUpdateCartMutation,
    useDeleteCartMutation,
    useClearCartMutation,
} = cartApi;