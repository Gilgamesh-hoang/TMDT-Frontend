import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const OrderChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "So luong don hang trong tuan",
      },
    },
  };
  const labels = [
    "T2",
    "T3",
    "T4",
    "T5",
    "T6",
    "T7",
    "CN",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Don hang (VND)",
        data: [51, 100, 121, 67, 80, 200, 163],
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
