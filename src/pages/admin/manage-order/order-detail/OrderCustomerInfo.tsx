import { MailIcon, PhoneIcon, UserIcon } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { CustomerInfo } from "./type";

export const OrderCustomerInfo: FC<CustomerInfo> = ({
  id,
  email,
  phone,
  fullName,
}) => {
  return (
    <div className="rounded-2xl border p-2">
      <h3>Thong tin khach hang</h3>
      <div className="flex flex-col space-y-2 text-gray-700">
        <div className="flex space-x-1">
          <UserIcon />
          <Link to={`users/${id}`}>
            <span>{fullName}</span>
          </Link>
        </div>
        <div className="flex space-x-1">
          <MailIcon /> <span>{email}</span>
        </div>
        <div className="flex space-x-1">
          <PhoneIcon />
          <span>{phone || "Chua co so dien thoai"}</span>
        </div>
      </div>
    </div>
  );
};
