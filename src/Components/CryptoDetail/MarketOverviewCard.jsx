import React from "react";
import { useGetGlobalStatsQuery } from "../Api/coinApi";

export default function MarketOverviewCard() {
  const { data, isLoading, isError } = useGetGlobalStatsQuery();
  const stats = data?.data;

  if (isLoading) return <p>Loading market overview...</p>;
  if (isError) return <p className="text-red-500">Failed to load stats.</p>;

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow border dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        🌐 Market Overview
      </h3>
      <ul className="space-y-2 text-gray-800 dark:text-gray-200 text-sm">
        <li>
          <strong>Total Market Cap:</strong>{" "}
          ${Number(stats.total_market_cap.usd).toLocaleString()}
        </li>
        <li>
          <strong>24h Volume:</strong>{" "}
          ${Number(stats.total_volume.usd).toLocaleString()}
        </li>
        <li>
          <strong>BTC Dominance:</strong> {stats.market_cap_percentage.btc.toFixed(2)}%
        </li>
        <li>
          <strong>Active Cryptocurrencies:</strong> {stats.active_cryptocurrencies}
        </li>
      </ul>
    </div>
  );
}
