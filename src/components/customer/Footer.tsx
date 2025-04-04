import { cn } from "@/lib/utils";
import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
export const FooterLinks: React.FC<{ className?: string }> = ({
  className,
}) => {
  const links = [
    {
      header: "SHOP",
      links: [
        { name: "Tinh dầu", to: "/" },
        { name: "Nến thơm", to: "/" },
        { name: "Dầu massage", to: "/" },
        { name: "Reed Diffuser", to: "/" },
      ],
    },
    {
      header: "CHÍNH SÁCH",
      links: [
        { name: "Chính sách bảo mật", to: "/" },
        { name: "Chính sách giao hàng", to: "/" },
        { name: "Điều khoản cửa hàng", to: "/" },
      ],
    },
    {
      header: "ABOUT",
      links: [
        { name: "Blog", to: "/" },
        { name: "Về chúng tôi", to: "/" },
        { name: "Liên hệ", to: "/" },
      ],
    },
  ];
  return (
    <div className={cn("grid grid-cols-3 gap-4", className)}>
      {links.map((item) => (
        <div  className="grid-cols-1" key={item.header}>
          <p className="font-bold font-xl mb-4">{item.header}</p>
          <div className="flex flex-col gap-1">
            {item.links.map((link) => (
              <Link
                key={link.name}
                className="text-sm hover:underline transition-all"
                to={link.to}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
const EmailSubcribe: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <p className="font-bold font-xl mb-4">
        NHẬN NGAY 5% OFF CHO ĐƠN HÀNG ĐẦU TIÊN
      </p>
      <p className="text-[12px] text-gray-600">
        và là người đầu tiên biết về các sản phẩm mới, ưu đãi đặc biệt, sự kiện,
        tin tức tại AN NHIEN.
      </p>
      <div className="flex  gap-4 py-2">
        <Input placeholder="Your email address" />
        <Button className="bg-success font-bold">JOIN</Button>
      </div>
      <div className="w-26 h-26">
        <img src="https://images.dmca.com/Badges/dmca_protected_14_120.png?ID=ee752381-d722-45d0-8a20-5f7a86f59a77" />
      </div>
    </div>
  );
};
export const Footer = () => {
  return (
    <div className="grid grid-cols-7 gap-10 ">
      <div className="col-span-2 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <MapPin size={30} />
          <p>48A Đường số 39, Phường Tân Quy, Quận 7, TP.HCM, 72913</p>
        </div>
        <div className="flex items-center gap-2">
          <Phone />
          <p>095 235 233</p>
        </div>
        <div className="flex items-center gap-2">
          <Mail />
          <p>Dubanteo2003@gmail.com</p>
        </div>
      </div>
      <FooterLinks className="col-span-3" />
      <EmailSubcribe className="col-span-2" />
    </div>
  );
};
