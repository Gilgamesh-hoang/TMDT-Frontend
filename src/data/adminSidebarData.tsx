import { ADMIN_ROUTES } from "@/types/constant";
import {
  BookOpen,
  ChartPie,
  Images,
  LayoutDashboardIcon,
  MessagesSquare,
  Newspaper,
  ReceiptText,
  Stars,
  TagIcon,
  Users,
  UsersRound,
  Warehouse,
} from "lucide-react";

export interface SideBarLinkItemProps {
  icon: React.ReactNode;
  name: string;
  href: string;
}
interface AdminSideBarData {
  group: string;
  linkItems: SideBarLinkItemProps[];
}
export const adminSideBarData: AdminSideBarData[] = [
  {
    group: "CHUNG",
    linkItems: [
      {
        icon: <LayoutDashboardIcon />,
        name: "Bảng điều khiển",
        href: ADMIN_ROUTES.DASHBOARD,
      },
      {
        icon: <ChartPie />,
        name: "Thống kê",
        href: "/charts",
      },
      {
        icon: <Warehouse />,
        name: "Sản phẩm",
        href: ADMIN_ROUTES.MANAGE_PRODUCT,
      },
      {
        icon: <TagIcon />,
        name: "Danh mục",
        href: ADMIN_ROUTES.MANAGE_CATEGORY,
      },
      {
        icon: <ReceiptText />,
        name: "Đơn hàng",
        href: ADMIN_ROUTES.MANAGE_ORDER,
      },
    ],
  },
  {
    group: "Người dùng",
    linkItems: [
      {
        icon: <UsersRound />,
        name: "Khách hàng",
        href: "/customers",
      },
      {
        icon: <Users />,
        name: "Nhân viên",
        href: "/staffs",
      },
    ],
  },
  {
    group: "Trang",
    linkItems: [
      {
        icon: <Newspaper />,
        name: "Tin tức",
        href: "/news",
      },
      {
        icon: <BookOpen />,
        name: "Chính sách",
        href: "/policies",
      },
      {
        icon: <Images />,
        name: "Carousel",
        href: "/carousels",
      },
    ],
  },
  {
    group: "Khác",
    linkItems: [
      {
        icon: <Stars />,
        name: "Đánh giá",
        href: ADMIN_ROUTES.MANAGE_RATING,
      },
      {
        icon: <MessagesSquare />,
        name: "Bình luận",
        href: ADMIN_ROUTES.MANAGE_COMMENT,
      },
    ],
  },
];
