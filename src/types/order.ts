import { UseFormReturn } from "react-hook-form";
import { CheckoutValidation } from "@/validation";
import { z } from "zod";
import { Payment } from "./payment";
import { OrderStatusSchema } from "@/pages/admin/manage-order/formSchema";
export const orderStatusValues = [
  "PENDING",
  "PROCESSING",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
] as const;
export type OrderStatus = (typeof orderStatusValues)[number];
export const orderStatusVN: Record<OrderStatus, string> = {
  PENDING: "Đang chờ xử lý",
  PROCESSING: "Đang xử lý",
  DELIVERED: "Đã giao",
  CANCELLED: "Đã hủy",
  RETURNED: "Đã trả hàng",
};

export interface OrderSummary {
  id: string;
  customerName: string;
  phoneNumber: string;
  totalAmount: number;
  status: OrderStatus;
  payment: Payment;
  createdAt: string;
}

export type UpdateOrderStatusRequest = z.infer<typeof OrderStatusSchema>;
export type PlaceOrderRequest = z.infer<typeof CheckoutValidation>;

export type FormType = UseFormReturn<PlaceOrderRequest>;

export interface OnlinePaymentResponse {
  paymentUrl: string;
}
