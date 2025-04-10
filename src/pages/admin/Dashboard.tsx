import { OrderChart } from "@/components/admin/dashboard/OrderChart";
import { RecentCustomers } from "@/components/admin/dashboard/RecentCustomers";
import { RecentOrders } from "@/components/admin/dashboard/RecentOrders";
import { RevenueChart } from "@/components/admin/dashboard/RevenueChart";
import { WidgetSummaries } from "@/components/admin/dashboard/WidgetSummaries";

export const Dashboard = () => {
  return (
    <div className="px-4 my-2 w-full flex flex-col gap-y-5 ">
      <WidgetSummaries />
      <div className="grid grid-cols-2 gap-x-4">
        <RevenueChart />
        <OrderChart />
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <RecentOrders />
        <RecentCustomers />
      </div>
    </div>
  );
};
