import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function CoinSearch({ coinList = [], onSelect }) {
  const [query, setQuery] = useState("");

  const filteredCoins = coinList.filter((coin) =>
    coin.name.toLowerCase().includes(query.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <Input
        type="text"
        placeholder="Search coin by name or symbol..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* List filtered results */}
      {query && (
        <div className="bg-white dark:bg-gray-800 border rounded-lg max-h-60 overflow-y-auto shadow">
          {filteredCoins.length === 0 ? (
            <p className="p-3 text-sm text-gray-500 dark:text-gray-400">
              No coins found.
            </p>
          ) : (
            filteredCoins.map((coin) => (
              <button
                key={coin.coinId}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                onClick={() => {
                  onSelect(coin);
                  setQuery(""); // reset input
                }}
              >
                {coin.name} ({coin.symbol.toUpperCase()})
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
