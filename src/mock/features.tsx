import { Feature } from "@/components/customer/home/Features";
import { ShoppingCart, TruckIcon, User2Icon } from "lucide-react";
export const features: Feature[] = [
  {
    icon: <ShoppingCart size={50} />,
    title: "Mua sắm",
    description:
      "Trải nghiệm mua sắm tiện lợi với quy trình đơn giản và nhanh chóng.",
  },
  {
    icon: <TruckIcon size={50} />,
    title: "Giao hàng",
    description:
      "Dịch vụ giao hàng nhanh chóng, đúng hẹn và an toàn đến tận tay bạn.",
  },
  {
    icon: <User2Icon size={50} />,
    title: "Chăm sóc khách hàng",
    description:
      "Đội ngũ hỗ trợ nhiệt tình, luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc.",
  },
];
