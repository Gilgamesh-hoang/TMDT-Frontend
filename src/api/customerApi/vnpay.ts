import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithAccessToken} from "@/api/util.ts";
import {ApiResponse} from "@/types/response.ts";
import {PlaceOrderRequest, VNPAYResponse} from "@/types/order.tsx";

export const vnpayApi = createApi({
    reducerPath: "vnpayApi",
    baseQuery: baseQueryWithAccessToken,
    endpoints: (builder) => ({

        vnpayPayment: builder.mutation<ApiResponse<VNPAYResponse>, PlaceOrderRequest>({
            query: (request) => ({
                url: 'orders/vnpay-payment/submit-order',
                method: 'POST',
                body: request,
            }),
        }),

        completePayment: builder.mutation<ApiResponse<void>, Record<string, string>>({
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
    useCompletePaymentMutation
} = vnpayApi;