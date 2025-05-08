import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
import { Bounce, toast } from "react-toastify";
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
    theme: "light",
    transition: Bounce,
    position: "bottom-right",
  });
};

export const toastError = (message: string, timeout = 1000) => {
  toast.error(message, {
    autoClose: timeout,
    closeOnClick: true,
    pauseOnHover: false,
    theme: "light",
    transition: Bounce,
    position: "bottom-right",
  });
};

export function calculateDiscountPercentage(
  price: number,
  discountPrice: number,
): number {
  if (
    discountPrice === 0 ||
    price <= 0 ||
    discountPrice < 0 ||
    discountPrice >= price
  ) {
    return 0;
  }
  const discount = ((price - discountPrice) / price) * 100;
  return Math.round(discount);
}

export const snakeToCamel = (str: string): string => {
  return str.replace(/(_\w)/g, (match) => match[1].toUpperCase());
};

export const transformToCamelCase = <T>(data: any): T => {
  const result: any = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const camelKey = snakeToCamel(key);
      result[camelKey] = data[key];
    }
  }
  return result as T;
};
