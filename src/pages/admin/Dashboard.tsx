import { RecentCustomers } from "@/components/admin/dashboard/RecentCustomers";
import { RecentOrders } from "@/components/admin/dashboard/RecentOrders";
import { WidgetSummaries } from "@/components/admin/dashboard/WidgetSummaries";

export const Dashboard = () => {
  return (
    <div className="p-4 w-full flex flex-col gap-y-6  h-[1000px]">
      <WidgetSummaries />
      <div className="grid grid-cols-2 gap-x-4">
        <RecentOrders />
        <RecentCustomers />
      </div>
    </div>
  );
};
