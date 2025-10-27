import React from "react";
import { useGetTopCoinsQuery } from "../Api/coinApi";
import CoinCard from "../Components/CoinCard";

export default function CoinList() {
  const { data, isLoading, isError } = useGetTopCoinsQuery();

  if (isLoading) return <p className="text-center py-4">Loading coins...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load coins.</p>;

  return (
    <div className="p-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {data?.map((coin) => (
        <CoinCard
          key={coin.id}
          coin={{
            name: coin.name,
            symbol: coin.symbol,
            priceUsd: coin.current_price,
            changePercent24Hr: coin.price_change_percentage_24h,
            iconUrl: coin.image,
          }}
        />
      ))}
    </div>
  );
}
