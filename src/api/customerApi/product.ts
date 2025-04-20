import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ApiResponse} from "@/types/response.ts";
import {ACCESS_TOKEN_LOCALSTORAGE, SERVER_URL} from "@/types/constant.ts";
import {Product} from "@/types/product.ts";
import {PaginationRequest} from "@/types/pagination.ts";


export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: SERVER_URL + '/products',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(ACCESS_TOKEN_LOCALSTORAGE);
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['NewestProducts', 'BestSellerProducts', 'MostViewedProducts'],
    endpoints: (builder) => ({
        getNewestProducts: builder.query<ApiResponse<Product[]>, PaginationRequest>({
            query: ({page, size}) => ({
                url: '/newest',
                params: {page, size},
            }),
            providesTags: ['NewestProducts'],
        }),
        getBestSellerProducts: builder.query<ApiResponse<Product[]>, PaginationRequest>({
            query: ({page, size}) => ({
                url: '/best-seller',
                params: {page, size},
            }),
            providesTags: ['BestSellerProducts'],
        }),
        getMostViewedProducts: builder.query<ApiResponse<Product[]>, PaginationRequest>({
            query: ({page, size}) => ({
                url: '/most-viewed',
                params: {page, size},
            }),
            providesTags: ['MostViewedProducts'],
        }),


    }),
});

export const {
    useGetNewestProductsQuery,
    useGetBestSellerProductsQuery,
    useGetMostViewedProductsQuery,
} = productApi;