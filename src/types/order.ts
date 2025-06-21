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
  RETURNED: "Trả hàng",
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


//user
export interface OrderRequest {
  fullName: string;
  phoneNumber: string;
  street: string;
  province: string;
  district: string;
  commune: string;
  note?: string;
  paymentMethod: string;
}

export interface UserOrderSummaryResponse {
  id: string;
  fullName: string;
  phoneNumber: string;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  totalItems: number;
}

export interface UserOrderDetailResponse {
  id: string;
  fullName: string;
  phoneNumber: string;
  street: string;
  province: string;
  district: string;
  commune: string;
  note?: string;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  orderItems: UserOrderItemResponse[];
}

export interface UserOrderItemResponse {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface GetUserOrdersParams {
  status?: OrderStatus;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}


// Utility types for better type safety
export type OrderStatusFilter = OrderStatus | 'ALL';

export interface OrderFilters {
  status?: OrderStatus;
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
}