import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchlist, deleteWatchlistCoin } from "@/Store/watchlistSlice";
import WatchlistTable from "../components/WatchlistTable";
import { toast } from "sonner";

export default function WatchlistPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: watchlist, loading } = useSelector((state) => state.watchlist);

  useEffect(() => {
    if (user?.$id) {
      dispatch(fetchWatchlist(user.$id));
    }
  }, [user?.$id, dispatch]);

  const handleDelete = async (coin) => {
    try {
      await dispatch(deleteWatchlistCoin({ userId: user.$id, documentId: coin.$id }));
      toast.success(`${coin.name} removed from Watchlist`);
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to remove from Watchlist");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-4">Your Watchlist</h1>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <WatchlistTable watchlist={watchlist} onRemove={handleDelete} />
      )}
    </div>
  );
}
