import { uuid } from "@/lib/utils";
import { Warehouse } from "lucide-react";
import { FaTruck, FaUsers } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import {
  AnalyticsWidgetSummary,
  AnalyticsWidgetSummaryProps,
} from "@/components/admin/dashboard/AnalyticsWidgetSummary";
import { FC } from "react";
import { DashboardResponse } from "@/types/dashboard";
export const WidgetSummaries: FC<DashboardResponse> = ({
  orderCount,
  productCount,
  totalRevenue,
  customerCount,
}) => {
  const analyticsSummaries: AnalyticsWidgetSummaryProps[] = [
    {
      icon: <FaSackDollar size={60} />,
      title: "Doanh thu",
      color: "green",
      total: totalRevenue,
      currency:true
    },
    {
      icon: <FaTruck size={60} />,
      title: "Đơn hàng",
      color: "orange",
      total: orderCount,
    },
    {
      icon: <FaUsers size={60} />,
      title: "Khách hàng",
      color: "fuchsia",
      total: customerCount,
    },
    {
      icon: <Warehouse size={60} />,
      title: "Sản phẩm",
      color: "blue",
      total: productCount,
    },
  ];
  return (
    <div className="grid grid-cols-4 gap-x-6">
      {analyticsSummaries.map((summary) => (
        <AnalyticsWidgetSummary key={uuid()} {...summary} />
      ))}
    </div>
  );
};
