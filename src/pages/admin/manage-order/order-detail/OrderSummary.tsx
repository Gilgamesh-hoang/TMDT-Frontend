import { StatusBar } from "@/components/ui/status";
import { getPaymentImage } from "@/lib/string-utils";
import { formatCurrency } from "@/lib/utils";
import { OrderSummary as OrderSummaryProps } from "@/types/order";
import { FC } from "react";

export const OrderSummary: FC<
  OrderSummaryProps & { orderItemCount: number }
> = ({ payment, totalAmount, orderItemCount }) => {
  return (
    <div className="rounded-2xl border p-2">
      <h3>Tổng quan</h3>
      <div className="flex items-center space-x-2">
        <div>
          <img width={42} src={getPaymentImage(payment.paymentMethod)} />
        </div>
        <StatusBar status={payment.paymentStatus} />
      </div>
      <div className="grid grid-cols-10 mt-4">
        <div className="col-span-5">
          <p>Tam tinh</p>
          <p>Phi van chuyen</p>
          <p>Tong cong</p>
        </div>
        <div className="col-span-4">
          <p>{orderItemCount} san pham</p>
          <p>Mien phi</p>
        </div>
        <div className="col-span-1 text-right">
          <p>{formatCurrency(totalAmount)}</p>
          <p>{formatCurrency(0)}</p>
          <p className="font-bold">{formatCurrency(totalAmount)}</p>
        </div>
      </div>
    </div>
  );
};
