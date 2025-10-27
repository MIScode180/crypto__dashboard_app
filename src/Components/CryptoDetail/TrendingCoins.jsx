import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { useGetTopCoinsQuery } from "../../Api/coinApi";
import watchlistService from "@/appwrite/WatchlistService";
import { fetchWatchlist } from "@/Store/watchlistSlice";
import { showSuccess, showError } from "@/utils/toast"; // optional toast helpers

export default function TrendingCoins({ onSelectCoin = () => {} }) {
  const dispatch = useDispatch();
  const { data = [], isLoading, isError } = useGetTopCoinsQuery();
  const { user } = useSelector((state) => state.auth);

  const handleAddToWatchlist = async (coin) => {
    if (!user?.$id) {
      showError("Login required to add to watchlist!");
      return;
    }

    try {
      await watchlistService.addToWatchlist({
        userId: user.$id,
        coinId: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        iconUrl: coin.image || `/icons/default-coin.png`,
      });

      dispatch(fetchWatchlist(user.$id));
      showSuccess(`${coin.name} added to watchlist!`);
    } catch (err) {
      console.error("Failed to add to watchlist:", err);
      showError("Failed to add coin to watchlist.");
    }
  };

  return (
    <div className="overflow-x-auto bg-[#0a0f20] rounded-xl p-4 text-white shadow-md">
      <h2 className="text-xl font-semibold mb-4">🔥 Trending Coins</h2>

      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-gray-700 text-gray-300">
            <th className="py-2">Coin</th>
            <th className="py-2">Price</th>
            <th className="py-2">Change</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="4" className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td colSpan="4" className="text-center text-red-500 py-4">
                Error loading coins
              </td>
            </tr>
          ) : (
            data.map((coin) => (
              <tr
                key={coin.id}
                className="hover:bg-gray-900 transition cursor-pointer"
              >
                <td
                  className="flex items-center gap-2 py-2"
                  onClick={() => onSelectCoin(coin.id)}
                >
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-6 h-6 rounded-full"
                  />
                  {coin.name}
                </td>
                <td>${coin.current_price.toFixed(2)}</td>
                <td
                  className={
                    coin.price_change_percentage_24h >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddToWatchlist(coin)}
                  >
                    + Watchlist
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
