import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const coinApi = createApi({
  reducerPath: 'coinApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coingecko.com/api/v3/' }),
  endpoints: (builder) => ({
    getTopCoins: builder.query({
      query: () =>
        'coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&page=1&sparkline=false',
    }),
    getGlobalStats: builder.query({
      query: () => 'global',
    }),
  }),
});

export const getAllCoins = async () => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/list"
  );
  if (!response.ok) throw new Error("Failed to fetch coin list");
  
  const data = await response.json();

  // Normalize it for AlertForm (id, name, symbol)
  return data.map((coin) => ({
    coinId: coin.id,
    name: coin.name,
    symbol: coin.symbol,
  }));
};

export const getCoinDetailsById = async (id) => {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
  if (!response.ok) throw new Error("Failed to fetch coin details");

  const data = await response.json();
  return {
    coinId: data.id,
    name: data.name,
    symbol: data.symbol,
    priceUsd: data.market_data.current_price.usd,
    changePercent24Hr: data.market_data.price_change_percentage_24h,
    iconUrl: data.image.small, // or .thumb or .large
  };
};

export const { useGetTopCoinsQuery, useGetGlobalStatsQuery } = coinApi;
