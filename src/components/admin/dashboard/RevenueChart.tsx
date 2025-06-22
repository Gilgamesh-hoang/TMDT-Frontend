import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { FC } from "react";
import { MonthlyRevenue } from "@/types/dashboard";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const RevenueChart: FC<{ monthlyRevenues: MonthlyRevenue[] }> = ({
  monthlyRevenues,
}) => {
  const revenues = [...Array(12).fill(0)];
  monthlyRevenues.forEach((item) => {
    revenues[item.month - 1] = item.totalAmount;
  });
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Doanh thu cửa hàng ",
      },
    },
  };
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Doanh thu (VND)",
        data: revenues,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};
