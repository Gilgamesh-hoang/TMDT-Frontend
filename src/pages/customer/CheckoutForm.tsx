import {FC, useEffect} from 'react';
import {useForm} from "react-hook-form";
import {CheckoutValidation} from "@/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form.tsx";
import SummaryOrder from "@/components/customer/order/SummaryOrder.tsx";
import ListProducts from "@/components/customer/order/ListProducts.tsx";
import ShippingInfo from "@/components/customer/order/ShippingInfo.tsx";
import PaymentMethod from "@/components/customer/order/PaymentMethod.tsx";
import {FormType, PlaceOrderRequest} from "@/types/order.tsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {ROUTES} from "@/types/constant.ts";
import {useGetCartQuery} from "@/api/customerApi/cart.ts";
import type {CartItem as CartItemType} from "@/types/cart.ts";
import usePaymentHandler from "@/hooks/usePayment.ts";

const CheckoutForm: FC = () => {
    const {data: cartResponse, isLoading: isCartLoading} = useGetCartQuery();
    const cartItems: CartItemType[] = cartResponse?.data || [];
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { isLoading, handlePaymentRequest } = usePaymentHandler(searchParams);

    const form: FormType = useForm<PlaceOrderRequest>({
        resolver: zodResolver(CheckoutValidation),
        defaultValues: {
            fullName: "",
            phoneNumber: "",
            street: "",
            province: "",
            district: "",
            commune: "",
            note: "",
            paymentMethod: 'VNPAY'
        },
    });

    // Navigate to cart if no items
    useEffect(() => {
        if (!isCartLoading && cartItems.length === 0) {
            navigate(ROUTES.CART);
        }
    }, [isCartLoading, cartItems.length, navigate]);

    // Xử lý gửi biểu mẫu
    const handleSubmit = async (data: PlaceOrderRequest) => {
        // Normalize province and district (assuming they contain codes with a separator)
        data.province = data.province.split('-')[1] || data.province;
        data.district = data.district.split('-')[1] || data.district;

        await handlePaymentRequest(data, data.paymentMethod);

    };

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
