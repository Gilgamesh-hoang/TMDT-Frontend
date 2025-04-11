export type OrderStatus = "Success" | "Failed" | "Pending" | "Processing";
export interface Order {
  id: number;
  date: string;
  customerName: string;
  total: number;
  status: OrderStatus;
}
