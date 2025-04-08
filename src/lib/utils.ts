import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Bounce, toast } from 'react-toastify';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
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