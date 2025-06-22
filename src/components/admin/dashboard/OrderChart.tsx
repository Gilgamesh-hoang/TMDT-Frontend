import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import { FC } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const OrderChart: FC<{ dailyOrderCount: number[] }> = ({
  dailyOrderCount,
}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Số lượng đơn hàng trong tuần",
      },
    },
  };
  const labels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const data = {
    labels,
    datasets: [
      {
        label: "Đơn hàng",
        data: dailyOrderCount,
        backgroundColor: "rgba(155, 199, 132, 0.5)",
      },
    ],
  };
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};
