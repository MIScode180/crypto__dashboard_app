import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
);

export default function PriceChart({ chartData = [], coinName = "Bitcoin" }) {
  if (!Array.isArray(chartData) || chartData.length === 0) {
    return <p className="text-center text-red-500">No chart data available.</p>;
  }

  const labels = chartData.map((point) =>
    new Date(point[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const prices = chartData.map((point) => point[1]);

  const data = {
    labels,
    datasets: [
      {
        label: `${coinName} Price`,
        data: prices,
        fill: true,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        ticks: { color: "#aaa" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        ticks: { color: "#aaa" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
  };

  return (
    <motion.div
      className="bg-gray-900 dark:bg-gray-800 rounded-xl p-4 shadow-md h-[300px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-lg font-semibold mb-4 text-white capitalize">
        {coinName} Price Chart
      </h2>
      <Line data={data} options={options} />
    </motion.div>
  );
}
