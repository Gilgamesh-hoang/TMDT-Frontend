import { translateToVN } from "@/lib/string-utils";
import { statusColorMap } from "@/lib/utils";
import { OrderStatus } from "@/types/order";
import { PaymentStatus } from "@/types/payment";
import { FC } from "react";

interface StatusBarProps {
  status: OrderStatus | PaymentStatus;
}
export const StatusBar: FC<StatusBarProps> = ({ status }) => {
  const vietnameseStatus = translateToVN(status);
  const colorClass = statusColorMap[status] || "bg-gray-100 text-gray-800";

  return (
    <span
      className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${colorClass}`}
    >
      {vietnameseStatus}
    </span>
  );
};
