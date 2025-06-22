import { RevenueChartWithFilter } from "./RevenueChartWithFilter";
import { RevenuePieChartWithSelector } from "./RevenuePieChart";

export const StatisticsPage = () => {
  return (
    <div className="px-4 my-2 w-full flex flex-col gap-y-5 ">
      <RevenueChartWithFilter />
      <RevenuePieChartWithSelector />
    </div>
  );
};
