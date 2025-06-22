import {
  useGetDailyOrderCountQuery,
  useGetDashboardQuery,
  useGetMonthlyRevenueQuery,
} from "@/api/adminApi/dashboard";
import { OrderChart } from "@/components/admin/dashboard/OrderChart";
import { RecentCustomers } from "@/components/admin/dashboard/RecentCustomers";
import { RecentOrders } from "@/components/admin/dashboard/RecentOrders";
import { RevenueChart } from "@/components/admin/dashboard/RevenueChart";
import { WidgetSummaries } from "@/components/admin/dashboard/WidgetSummaries";
import Loader from "@/components/ui/Loader";

export const Dashboard = () => {
  const { data, isLoading } = useGetDashboardQuery();
  const { data: monthlyRevenue } = useGetMonthlyRevenueQuery();
  const { data: dailyOrderCount } = useGetDailyOrderCountQuery();
  if (isLoading) return <Loader />;
  return (
    <div className="px-4 my-2 w-full flex flex-col gap-y-5 ">
      {data && (
        <div>
          <WidgetSummaries {...data} />
          <div className="grid grid-cols-2 gap-x-4">
            {monthlyRevenue && (
              <RevenueChart monthlyRevenues={monthlyRevenue} />
            )}
            {dailyOrderCount && (
              <OrderChart dailyOrderCount={dailyOrderCount} />
            )}
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <RecentOrders data={data.orderSummaryResponses} />
            <RecentCustomers data={data.adminAccountResponses} />
          </div>
        </div>
      )}
    </div>
  );
};
