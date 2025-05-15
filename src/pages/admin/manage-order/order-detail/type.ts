import { OrderSummary } from "@/types/order";
import { Payment } from "@/types/payment";
import { ProductSummaryResponse } from "@/types/product";

/* OrderSummaryResponse orderSummary,
    PaymentResponse payment,
    List<OrderItemSummary> orderItems,
    String street,
    String note,
    String address,
    String recipient,
    CustomerInfo customerInfo */
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
  payment: Payment;
  orderItems: OrderItemSummary[];
  customerInfo: CustomerInfo;
  street: string;
  note: string;
  address: string;
  recipient: string;
  createdAt: string;
}
