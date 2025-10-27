import axios from "axios";

export async function getMarketChart(coinId = "bitcoin") {
  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days: 1,
        },
      }
    );

    // This must be an array of [timestamp, price]
    return res.data.prices || [];
  } catch (error) {
    console.error("getMarketChart error:", error);
    return [];
  }
}
