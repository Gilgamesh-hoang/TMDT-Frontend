import { OrderStatus } from "@/components/admin/dashboard/RecentOrders";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};
export const uuid = () => {
  return uuidv4();
};

export const statusColorMap: Record<OrderStatus, string> = {
  Success: "bg-success ",
  Failed: "bg-error",
  Pending: "bg-amber-500",
  Processing: "bg-blue-500",
};
