import { Button } from "@/components/ui/button";
import { StatusBar } from "@/components/ui/status";
import { formatDateTime } from "@/lib/string-utils";
import { OrderSummary } from "@/types/order";
import { FC } from "react";

export const OrderInfo: FC<OrderSummary> = ({ id, createdAt, status }) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h2 className="leading-2">Đơn hàng: {id}</h2>
          <StatusBar status={status} />
        </div>
        <div>
          <Button variant={"outline"} className="rounded-2xl">
            Nhap them
          </Button>
        </div>
      </div>
      <p className="text-gray text-sm">Dat luc {formatDateTime(createdAt)}</p>
    </div>
  );
};
