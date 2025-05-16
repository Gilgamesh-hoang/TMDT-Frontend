import { Button } from "@/components/ui/button";
import { MapIcon, UserIcon } from "lucide-react";
import { FC } from "react";

interface OrderShipingInfoProps {
  recipient: string;
  street: string;
  address: string;
  phone: string;
}
export const OrderShipingInfo: FC<OrderShipingInfoProps> = ({
  recipient,
  street,
  address,
  phone,
}) => {
  return (
    <div className="rounded-2xl border p-2">
      <h3>Thong tin giao hang</h3>
      <div className="flex flex-col space-y-1 text-gray-700">
        <div className="flex space-x-1">
          <UserIcon />
          <span>{recipient}</span>
        </div>
        <span>{street}</span>
        <span>{address}</span>
        <span>+84{phone}</span>
      </div>
      <Button variant={"ghost"} className="text-primary">
        <MapIcon />
        Xem ban do
      </Button>
    </div>
  );
};
