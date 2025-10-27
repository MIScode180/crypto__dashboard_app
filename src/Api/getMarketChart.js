import axios from "axios";

// Fetch last 1-day market chart from CoinGecko
export async function getMarketChart(coinId = "bitcoin", days = 1, vsCurrency = "usd") {
  try {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`;
    const { data } = await axios.get(url, {
      params: { vs_currency: vsCurrency, days },
    });

    // Format to: [{ time: "HH:mm", price: 123 }]
    const chartData = data.prices.map(([ts, price]) => {
      const time = new Date(ts).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return { time, price: Number(price.toFixed(2)) };
    });

    return chartData;
  } catch (error) {
    console.error("❌ getMarketChart error:", error);
    return [];
  }
}
