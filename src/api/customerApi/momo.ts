import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithAccessToken} from "@/api/util.ts";
import {ApiResponse} from "@/types/response.ts";
import {OnlinePaymentResponse, PlaceOrderRequest} from "@/types/order.tsx";

export const momoApi = createApi({
    reducerPath: "momoApi",
    baseQuery: baseQueryWithAccessToken,
    endpoints: (builder) => ({

        momoPayment: builder.mutation<ApiResponse<OnlinePaymentResponse>, PlaceOrderRequest>({
            query: (request) => ({
                url: 'orders/momo-payment/submit-order',
                method: 'POST',
                body: request,
            }),
        }),

        momoCompletePayment: builder.mutation<ApiResponse<void>, Record<string, string>>({
            query: (params) => ({
                url: 'orders/momo-payment/payment-completed',
                method: 'POST',
                body: params,
            }),
        })
    }),
});

export const {
    useMomoPaymentMutation,
    useMomoCompletePaymentMutation
} = momoApi;