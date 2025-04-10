import { uuid } from "@/lib/utils";
import { Warehouse } from "lucide-react";
import { FaTruck, FaUsers } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import {
  AnalyticsWidgetSummary,
  AnalyticsWidgetSummaryProps,
} from "@/components/admin/dashboard/AnalyticsWidgetSummary";
export const WidgetSummaries = () => {
  const analyticsSummaries: AnalyticsWidgetSummaryProps[] = [
    {
      icon: <FaSackDollar size={60} />,
      title: "Doanh thu",
      color: "green",
      total: 123,
    },
    {
      icon: <FaTruck size={60} />,
      title: "Đơn hàng",
      color: "orange",
      total: 223,
    },
    {
      icon: <FaUsers size={60} />,
      title: "Khách hàng",
      color: "fuchsia",
      total: 223,
    },
    {
      icon: <Warehouse size={60} />,
      title: "Sản phẩm",
      color: "blue",
      total: 223,
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
