import {useEffect, useState} from 'react';
import {PlaceOrderRequest} from "@/types/order.tsx";
import {useVnpayCompletePaymentMutation, useVnpayPaymentMutation} from "@/api/customerApi/vnpay.ts";
import {toastError, toastSuccess} from "@/lib/utils.ts";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "@/types/constant.ts";
import {useMomoCompletePaymentMutation, useMomoPaymentMutation} from "@/api/customerApi/momo.ts";

const usePaymentHandler = (searchParams: URLSearchParams) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [vnpayPayment, {isLoading: isVnpayPaymentLoading}] = useVnpayPaymentMutation();
    const [vnpayCompletePayment, {isLoading: isVnpayCompleteLoading}] = useVnpayCompletePaymentMutation();

    const [momoPayment, {isLoading: isMomoPaymentLoading}] = useMomoPaymentMutation();
    const [momoCompletePayment, {isLoading: isMomoCompleteLoading}] = useMomoCompletePaymentMutation();

    useEffect(() => {
        setIsLoading(
            isVnpayPaymentLoading ||
            isVnpayCompleteLoading ||
            isMomoPaymentLoading ||
            isMomoCompleteLoading
        );
    }, [isVnpayPaymentLoading, isVnpayCompleteLoading, isMomoPaymentLoading, isMomoCompleteLoading]);

    useEffect(() => {
        const params = Object.fromEntries(
            Array.from(searchParams.entries()).filter(([, value]) => value)
        );
        const hasOrderId = params.orderId;
        if (!hasOrderId) return;

        const paymentMethod = params.payment;
        const paymentHandlers = {
            ["momo"]: momoCompletePayment,
            ["vnpay"]: vnpayCompletePayment,
        };

        const handlePayment = async () => {
            const handler = paymentHandlers[paymentMethod];
            if (!handler) {
                console.warn(`Unsupported payment method: ${paymentMethod}`);
                return;
            }

            try {
                await handler(params).unwrap();
                toastSuccess('Thanh toán thành công', 2000);
                navigate(ROUTES.HOME);
            } catch (err) {
                console.error('Payment error:', err);
                toastError('Thanh toán không thành công');
            }
        };

        handlePayment();
    }, [searchParams]);

    const handlePaymentRequest = async (request: PlaceOrderRequest, method: 'MOMO' | 'VNPAY') => {
        const paymentHandler = method === 'MOMO' ? momoPayment : vnpayPayment;
        try {
            const response = await paymentHandler(request).unwrap();
            if (response.data?.paymentUrl) {
                window.location.href = response.data.paymentUrl;
            } else {
                toastError(`Lỗi khi tạo giao dịch ${method}`, 2000);
            }
        } catch (err) {
            console.error(`Payment ${method} error:`, err);
            toastError('Đã xảy ra lỗi trong quá trình thanh toán');
        }
    };

    return {isLoading, handlePaymentRequest};
};

export default usePaymentHandler;