import { useGetRevenueByTimeQuery } from "@/api/adminApi/dashboard";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const RevenueChartWithFilter = () => {
  const [type, setType] = useState("month");
  const [start, setStart] = useState("2025-01-01");
  const [end, setEnd] = useState("2025-12-31");

  const { data = [], isLoading } = useGetRevenueByTimeQuery({
    type,
    start,
    end,
  });
  const labels = data.map((item) => item.timeLabel);
  const datasetData = data.map((item) => item.totalAmount);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Doanh thu theo ${type === "month" ? "tháng" : "năm"}`,
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "Doanh thu (VND)",
        data: datasetData,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow w-full">
      <h2>Thống kê doanh thu cửa hàng</h2>
      <div className="flex flex-wrap gap-4 mb-6 items-end">
        <div>
          <label className="block text-sm font-medium">
            Chọn kiểu thời gian
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 p-2 border rounded-md"
          >
            <option value="month">Theo tháng</option>
            <option value="year">Theo năm</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Từ ngày</label>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="mt-1 p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Đến ngày</label>
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="mt-1 p-2 border rounded-md"
          />
        </div>
      </div>
      <div className="max-w-[800px]">

      {isLoading ? (
        <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
      ) : (
        <Bar data={chartData} options={options} />
      )}
      </div>
    </div>
  );
};
