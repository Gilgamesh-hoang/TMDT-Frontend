import {UseFormReturn} from "react-hook-form";
import {CheckoutValidation} from "@/validation";
import {z} from "zod";

export type OrderStatus = "Success" | "Failed" | "Pending" | "Processing";

export interface Order {
    id: number;
    date: string;
    customerName: string;
    total: number;
    status: OrderStatus;
}

export type PlaceOrderRequest = z.infer<typeof CheckoutValidation>;

export type FormType = UseFormReturn<PlaceOrderRequest>;

export interface OnlinePaymentResponse {
    paymentUrl: string;
}
