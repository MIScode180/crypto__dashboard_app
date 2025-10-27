import React, { useEffect, useState } from "react";
import { getAllCoins } from "../Api/coinApi"; // Your CoinGecko utility
import { WatchlistService } from "../appwrite/WatchlistService";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

export default function AddToWatchlist() {
  const [allCoins, setAllCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [userWatchlist, setUserWatchlist] = useState([]);
  const { user } = useSelector((state) => state.auth); // Get Appwrite user

  // Load all available coins
  useEffect(() => {
    getAllCoins().then(setAllCoins);
  }, []);

  // Load current watchlist for user
  useEffect(() => {
    if (user?.$id) {
      WatchlistService.getAll(user.$id).then(setUserWatchlist);
    }
  }, [user]);

  // Add coin to Appwrite DB
  const handleAdd = async (coin) => {
    const alreadyExists = userWatchlist.some(
      (c) => c.coinId === coin.coinId
    );
    if (alreadyExists) {
      alert("⚠️ Already added to watchlist!");
      return;
    }

    await WatchlistService.add(user.$id, coin);
    const updated = await WatchlistService.getAll(user.$id);
    setUserWatchlist(updated);
    alert("✅ Added to watchlist!");
  };

  const filteredCoins = allCoins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

return (
  <div className="p-6 min-h-screen bg-[#0a0f20] text-black dark:text-white">
    <h2 className="text-2xl font-bold mb-4">Add to Watchlist</h2>

    <input
      type="text"
      placeholder="Search coins..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full mb-4 px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white"
    />

    <div className="space-y-2 max-h-[60vh] overflow-y-auto">
      {filteredCoins.slice(0, 30).map((coin) => (
        <div
          key={coin.coinId}
          className="flex justify-between items-center bg-[#11192c] px-4 py-2 rounded-md"
        >
          <div>
            <p className="font-medium">{coin.name}</p>
            <p className="text-sm text-gray-400">{coin.symbol}</p>
          </div>
          <Button
            size="sm"
            onClick={() => handleAdd(coin)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-xs rounded "
          >
            ➕ Add
          </Button>
        </div>
      ))}
    </div>
  </div>
);
}