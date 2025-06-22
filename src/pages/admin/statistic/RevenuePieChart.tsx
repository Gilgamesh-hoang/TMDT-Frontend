import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useGetRevenueByCategoryQuery } from "@/api/adminApi/dashboard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

ChartJS.register(ArcElement, Tooltip, Legend);

export const RevenuePieChartWithSelector = () => {
  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [year, setYear] = useState(currentDate.getFullYear());

  const { data = [], isLoading } = useGetRevenueByCategoryQuery({
    month,
    year,
  });

  const labels = data.map((item) => item.categoryName);
  const datasetData = data.map((item) => item.totalRevenue);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Doanh thu (VND)",
        data: datasetData,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#E7E9ED",
        ],
        borderWidth: 1,
      },
    ],
  };

  const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  const yearOptions = [2023, 2024, 2025];
  return (
    <div className="bg-white ">
      <h2>Thống kê doanh thu theo danh mục</h2>
      <div className="flex items-center gap-4 mb-4">
        <div>
          <label>Tháng</label>
          <Select
            defaultValue={month + ""}
            onValueChange={(value) => setMonth(Number(value))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {monthOptions.map((m) => (
                <SelectItem key={m} value={String(m)}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label>Năm</label>
          <Select
            defaultValue={year + ""}
            onValueChange={(value) => setYear(Number(value))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map((m) => (
                <SelectItem key={m} value={String(m)}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <h3 className="text-center">
        Tỷ lệ doanh thu theo danh mục ({month}/{year})
      </h3>
      <div className="max-w-[600px] mx-auto">
        {isLoading ? (
          <p className="text-gray-500">Đang tải dữ liệu...</p>
        ) : data.length === 0 ? (
          <p className="text-gray-500">Không có dữ liệu.</p>
        ) : (
          <Pie data={chartData} />
        )}
      </div>
    </div>
  );
};
