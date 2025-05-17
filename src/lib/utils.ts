
import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import {v4 as uuidv4} from "uuid";
import {Bounce, toast} from "react-toastify";
import {OrderStatus} from "@/types/order";
import {UserRole} from "@/types/models.ts";


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


export const statusColorMap: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800 border border-amber-300",
  PROCESSING: "bg-blue-100 text-blue-800 border border-blue-300",
  DELIVERED: "bg-emerald-100 text-emerald-800 border border-emerald-300",
  CANCELLED: "bg-rose-100 text-rose-800 border border-rose-300",
  RETURNED: "bg-orange-100 text-orange-800 border border-orange-300",
  COMPLETED: "bg-green-100 text-green-800 border border-green-300",
  UNPAID: "bg-zinc-100 text-zinc-700 border border-zinc-300",
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

export const hasRole = (requiredRoles: UserRole[], userRoles: UserRole[]) => {
    return requiredRoles.some((role) => userRoles.includes(role));
};
