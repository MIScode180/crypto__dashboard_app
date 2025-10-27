import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function CoinCard({ coin }) {
  if (!coin) return null;

  const {
    name = "Unknown",
    symbol = "???",
    priceUsd = "0",
    changePercent24Hr = "0",
    iconUrl = "/icons/default-coin.png",
  } = coin;

  const price = parseFloat(priceUsd);
  const change = parseFloat(changePercent24Hr);
  const isUp = change >= 0;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-4 flex items-center justify-between transition-all border border-gray-200 dark:border-gray-700"
    >
      {/* Left: Icon + Info */}
      <div className="flex items-center gap-4">
        <img
          src={iconUrl}
          alt={symbol}
          className="w-10 h-10 rounded-full border dark:border-gray-600"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase">
            {symbol}
          </p>
        </div>
      </div>

      {/* Right: Price + Change */}
      <div className="text-right">
        <p className="text-lg font-medium text-gray-800 dark:text-white">
          ${price.toFixed(2)}
        </p>
        <p
          className={`flex items-center gap-1 text-sm font-medium ${
            isUp ? "text-green-500" : "text-red-500"
          }`}
        >
          {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change.toFixed(2)}%
        </p>
      </div>
    </motion.div>
  );
}
