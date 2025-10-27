import React from "react";
import { Button } from "@/Components/ui/button";

export default function WatchlistItem({ coin, onRemove }) {
  if (!coin || !coin.name || !coin.symbol) return null;

  const {
    name,
    symbol,
    iconUrl = "/icons/default-coin.png",
  } = coin;

  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-[#11192c] shadow-md text-white">
      <div className="flex items-center gap-4">
        <img
          src={iconUrl}
          alt={symbol}
          className="w-10 h-10 rounded-full border border-gray-500"
        />
        <div>
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-xs text-gray-400 uppercase">{symbol}</p>
        </div>
      </div>
      {onRemove && (
        <Button
          onClick={() => onRemove(coin)}
          variant="destructive"
          size="sm"
          className="px-2 py-1 text-xs"
        >
          Remove
        </Button>
      )}
    </div>
  );
}
