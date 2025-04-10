import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
import { Bounce, toast } from 'react-toastify';
import { OrderStatus } from "@/types/order";

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

export const toastSuccess = (message: string, timeout = 1000) => {
  toast.success(message, {
    autoClose: timeout,
    closeOnClick: true,
    pauseOnHover: false,
    theme: 'light',
    transition: Bounce,
  });
};

export const toastError = (message: string, timeout = 1000) => {
  toast.error(message, {
    autoClose: timeout,
    closeOnClick: true,
    pauseOnHover: false,
    theme: 'light',
    transition: Bounce,
  });
};
