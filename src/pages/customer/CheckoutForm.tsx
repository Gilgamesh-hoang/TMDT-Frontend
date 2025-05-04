import {FC, useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {z} from "zod";
import {CheckoutValidation} from "@/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form.tsx";
import SummaryOrder from "@/components/customer/order/SummaryOrder.tsx";
import ListProducts from "@/components/customer/order/ListProducts.tsx";
import ShippingInfo from "@/components/customer/order/ShippingInfo.tsx";
import PaymentMethod from "@/components/customer/order/PaymentMethod.tsx";
import {PaymentMethod as PaymentMethodType, PlaceOrderRequest} from "@/types/order.tsx";
import {useCompletePaymentMutation, useVnpayPaymentMutation} from "@/api/customerApi/vnpay.ts";
import {toastError, toastSuccess} from "@/lib/utils.ts";
import {useNavigate, useSearchParams} from "react-router-dom";
import {ROUTES} from "@/types/constant.ts";
import {useGetCartQuery} from "@/api/customerApi/cart.ts";
import type {CartItem as CartItemType} from "@/types/cart.ts";


const CheckoutForm: FC = () => {
    const [vnpayPayment, {isLoading: isVnpayLoading}] = useVnpayPaymentMutation();
    const [completePayment, {isLoading: isCheckoutLoading}] = useCompletePaymentMutation();
    const {data: cartResponse, isLoading: isCartLoading} = useGetCartQuery();
    const cartItems: CartItemType[] = cartResponse?.data || [];
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        // Chuyển các tham số từ searchParams thành object
        const params: Record<string, string> = {};
        for (const [key, value] of searchParams.entries()) {
            if (value) {
                params[key] = value;
            }
        }

        // Chỉ gửi request nếu có orderId
        if (params.orderId) {
            completePayment(params)
                .unwrap()
                .then(() => {
                    toastSuccess('Thanh toán thành công', 2000);
                    navigate(ROUTES.HOME)
                })
                .catch((err) => {
                    console.error(err);
                    toastError('Thanh toán không thành công');
                });
        }
    }, []);

    useEffect(() => {
        setIsLoading(isVnpayLoading || isCheckoutLoading);
    }, [isCheckoutLoading, isVnpayLoading]);

    const form = useForm<z.infer<typeof CheckoutValidation>>({
        resolver: zodResolver(CheckoutValidation),
        defaultValues: {
            fullName: "123",
            phoneNumber: "0355450523",
            street: "123",
            province: "123",
            district: "123",
            commune: "123",
            note: "123",
            paymentMethod: 'VNPAY'
        },
    });
    // const form = useForm<z.infer<typeof CheckoutValidation>>({
    //     resolver: zodResolver(CheckoutValidation),
    //     defaultValues: {
    //         fullName: "",
    //         phoneNumber: "",
    //         street: "",
    //         province: "",
    //         district: "",
    //         commune: "",
    //         note: "",
    //         paymentMethod: 'VNPAY'
    //     },
    // });

    // Xử lý gửi biểu mẫu
    const handleSubmit = async (data: any) => {
        const payment: PaymentMethodType = data.paymentMethod;

        // Gọi API thanh toán VNPAY
        const request: PlaceOrderRequest = {
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            street: data.street,
            province: data.province.split("-")[1],
            district: data.district.split("-")[1],
            commune: data.commune,
            note: data.note,
            paymentMethod: payment
        };

        try {
            // Gọi API thanh toán VNPAY
            const response = await vnpayPayment(request).unwrap();
            console.log('Response:', response.data.paymentUrl);
            // Kiểm tra phản hồi từ API
            const data = response.data;
            if (data.paymentUrl && data.code === '00') {
                // Chuyển hướng đến URL thanh toán VNPAY
                window.location.href = response.data.paymentUrl;
            } else {
                toastError('Lỗi khi tạo giao dịch VNPAY')
            }
        } catch (err) {
            console.error(err);
            toastError('Đã xảy ra lỗi trong quá trình thanh toán');
        }

    };

    if (!isCartLoading && cartItems.length === 0) {
        navigate(ROUTES.CART)
    }

    return (
        <div className="bg-white p-4 min-h-screen">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Cột bên trái: Thông tin giao hàng và Phương thức thanh toán */}
                        <div className="flex-1">
                            {/* Phần thông tin giao hàng */}
                            <ShippingInfo form={form}/>

                            {/* Phần phương thức thanh toán */}
                            <PaymentMethod form={form}/>
                        </div>

                        {/* The right column: product list and order summary */}
                        <div className="flex-1">
                            <ListProducts cartItems={cartItems}/>

                            {/* Summary Order */}
                            <SummaryOrder cartItems={cartItems} isLoading={isLoading}/>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default CheckoutForm;
