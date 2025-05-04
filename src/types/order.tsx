export type OrderStatus = "Success" | "Failed" | "Pending" | "Processing";

export interface Order {
    id: number;
    date: string;
    customerName: string;
    total: number;
    status: OrderStatus;
}


export type PaymentMethod = "VNPAY" | "MOMO";

export interface PlaceOrderRequest {
    fullName: string;
    phoneNumber: string;
    street: string;
    province: string;
    district: string;
    commune: string;
    note: string;
    paymentMethod: PaymentMethod;
}

export interface VNPAYResponse {
    code: string;
    paymentUrl: string;
}
