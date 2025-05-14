export const paymentStatusVN: Record<PaymentStatus, string> = {
  COMPLETED: "Đã thanh toán",
  UNPAID: "Chưa thanh toán",
};
export type PaymentStatus = "COMPLETED" | "UNPAID";
export type PaymentMethod = "VNPAY" | "MOMO";
export interface Payment {
  id: string;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
}
