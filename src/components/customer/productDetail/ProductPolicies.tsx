import { uuid } from "@/lib/utils";
import { FlaskRound, Phone, Truck } from "lucide-react";
import React, { ReactNode } from "react";
import { FaPaypal } from "react-icons/fa";

interface PolicyItemProps {
  title: string;
  description?: string;
  icon: ReactNode;
}
const PolicyItem: React.FC<PolicyItemProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="flex space-x-2 items-center">
      <div>{icon}</div>
      <div>
        <p className="font-bold text-sm">{title}</p>
        <p className="text-gray text-xs">{description}</p>
      </div>
    </div>
  );
};
export const ProductPolicies = () => {
  const data: PolicyItemProps[] = [
    {
      icon: <Truck />,
      title: "Giao hàng miễn phí",
      description: "Áp dụng cho nội thành TP. HCM",
    },
    {
      icon: <FlaskRound />,
      title: "Đổi trả miễn phí",
      description: "Đổi trả miễn phí trong vòng 7 ngày",
    },

    {
      icon: <FaPaypal />,
      title: "Thanh toán",
      description: "Thanh toán tiện lợi",
    },
    {
      icon: <Phone />,
      title: "Hotline",
      description: "0429529391",
    },
  ];
  return (
    <div className="my-2 grid grid-cols-2 p-2 rounded shadow border gap-2 border-gray-500 w-[500px]">
      {data.map((item) => (
        <PolicyItem {...item} key={uuid()} />
      ))}
    </div>
  );
};
