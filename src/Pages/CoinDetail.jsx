import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PriceChart from "../components/PriceChart";
import { getMarketChart } from "../Api/getMarketChart"; // Adjust the path if needed

export default function CoinDetail() {
  const { id } = useParams();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await getMarketChart(id, 1); // 1 day data
      setChartData(data);
      setLoading(false);
    }

    fetchData();
  }, [id]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        📊 {id.toUpperCase()} Price Chart
      </h2>

      <div className="mt-6">
        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading chart...</p>
        ) : chartData.length ? (
          <PriceChart data={chartData} />
        ) : (
          <p className="text-red-500">No data available</p>
        )}
      </div>
    </div>
  );
}
