import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithAuth} from "@/api/util.ts";
import {ApiResponse} from "@/types/response.ts";
import {OnlinePaymentResponse, PlaceOrderRequest} from "@/types/order.tsx";

export const vnpayApi = createApi({
    reducerPath: "vnpayApi",
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({

        vnpayPayment: builder.mutation<ApiResponse<OnlinePaymentResponse>, PlaceOrderRequest>({
            query: (request) => ({
                url: 'orders/vnpay-payment/submit-order',
                method: 'POST',
                body: request,
            }),
        }),

        vnpayCompletePayment: builder.mutation<ApiResponse<void>, Record<string, string>>({
            query: (params) => ({
                url: 'orders/vnpay-payment/payment-completed',
                method: 'POST',
                params,
            }),
        })
    }),
});

export const {
    useVnpayPaymentMutation,
    useVnpayCompletePaymentMutation
} = vnpayApi;