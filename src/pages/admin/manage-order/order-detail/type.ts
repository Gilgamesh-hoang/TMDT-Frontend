import { OrderSummary } from "@/types/order";
import { ProductSummaryResponse } from "@/types/product";

export interface CustomerInfo {
  id: string;
  fullName: string;
  phone: string;
  email: string;
}
export interface OrderItemSummary {
  price: number;
  quantity: number;
  product: ProductSummaryResponse;
}
export interface OrderDetail {
  orderSummary: OrderSummary;
  orderItems: OrderItemSummary[];
  customerInfo: CustomerInfo;
  street: string;
  note: string;
  address: string;
  recipient: string;
  createdAt: string;
}
