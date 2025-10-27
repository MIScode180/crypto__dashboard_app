import React from "react";
import { useGetFearGreedIndexQuery } from "@/Api/fearGreedApi";

export default function FearGreedCard() {
  const { data, isLoading, isError } = useGetFearGreedIndexQuery();
  const index = data?.data?.[0];

  const getColor = (value) => {
    if (value >= 70) return "text-green-500"; // Greed
    if (value >= 40) return "text-yellow-500"; // Neutral
    return "text-red-500"; // Fear
  };

  if (isLoading) return <p>Loading Fear & Greed Index...</p>;
  if (isError) return <p className="text-red-500">Failed to load data.</p>;

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow border dark:border-gray-700 text-center">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
         Fear & Greed Index
      </h3>
      <p className={`text-5xl font-bold ${getColor(index.value_int)}`}>
        {index.value}
      </p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {index.value_classification} ({index.timestamp})
      </p>
    </div>
  );
}
