import React from "react";
import WatchlistItem from "./WatchlistItem";

export default function WatchlistTable({ watchlist = [], onRemove }) {
  if (!watchlist.length) {
    return (
      <div className="text-center py-12 text-gray-400 bg-[#0a0f20] rounded-md shadow-inner">
        No coins in your watchlist yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {watchlist.map((coin) => (
        <WatchlistItem key={coin.$id} coin={coin} onRemove={onRemove} />
      ))}
    </div>
  );
}
