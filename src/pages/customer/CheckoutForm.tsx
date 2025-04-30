import {FC} from 'react';
import {useForm} from "react-hook-form";
import {z} from "zod";
import {CheckoutValidation} from "@/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form.tsx";
import cartItems from "@/mock/cartitem.ts";
import SummaryOrder from "@/components/customer/order/SummaryOrder.tsx";
import ListProducts from "@/components/customer/order/ListProducts.tsx";
import ShippingInfo from "@/components/customer/order/ShippingInfo.tsx";
import PaymentMethod from "@/components/customer/order/PaymentMethod.tsx";


const CheckoutForm: FC = () => {
    const form = useForm<z.infer<typeof CheckoutValidation>>({
        resolver: zodResolver(CheckoutValidation),
        defaultValues: {
            fullName: "",
            phoneNumber: "",
            street: "",
            province: "",
            district: "",
            commune: "",
            note: "",
            paymentMethod: 'vnpay'
        },
    });

    // Xử lý gửi biểu mẫu (giả định)
    const handleCheckout = (data: any) => {
        console.log('Form data:', data);
    };


    return (
        <div className="bg-white p-4 min-h-screen">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleCheckout)}>
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
                            <SummaryOrder cartItems={cartItems} onSubmit={form.handleSubmit(handleCheckout)}/>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default CheckoutForm;
