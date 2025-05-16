import { FC } from "react";
import { Navigate, useParams } from "react-router-dom";
import { OrderInfo } from "./OrderInfo";
import { OrderSummary } from "./OrderSummary";
import { OrderItemList } from "./OrderItemList";
import { OrderNote } from "./OrderNote";
import { OrderCustomerInfo } from "./OrderCustomerInfo";
import { OrderShipingInfo } from "./OrderShipingInfo";
import { useGetOrderDetailQuery } from "@/api/adminApi/order";
import { isValidUUID } from "@/lib/string-utils";
import Loader from "@/components/ui/Loader";

export const OrderDetail = () => {
  const { id } = useParams();
  const {
    data: orderDetail,
    isLoading,
    isError,
  } = useGetOrderDetailQuery(id!, {
    skip: !isValidUUID(id),
  });
  if (isLoading) return <Loader />;
  if (isError || !orderDetail) {
    return <Navigate to="/404" />;
  }
  return (
    <div className="flex flex-col px-4 mt-2">
      <OrderInfo {...orderDetail.orderSummary} />
      <div className="grid grid-cols-10 gap-4 mt-2">
        <div className="col-span-7 flex flex-col space-y-3 ">
          <OrderItemList orderItemList={orderDetail.orderItems} />
          <OrderSummary
            {...orderDetail.orderSummary}
            orderItemCount={orderDetail.orderItems.length}
          />
        </div>
        <div className="col-span-3 flex flex-col space-y-3  ">
          <OrderNote note={orderDetail.note} />
          <OrderCustomerInfo {...orderDetail.customerInfo} />
          <OrderShipingInfo
            phone={orderDetail.orderSummary.phoneNumber}
            street={orderDetail.street}
            recipient={orderDetail.recipient}
            address={orderDetail.address}
          />
        </div>
      </div>
    </div>
  );
};
