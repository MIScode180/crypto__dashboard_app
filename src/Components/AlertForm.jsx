import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import CoinSearch from "../Components/CoinSearch";

export default function AnimatedAlertForm({ onSubmit, coinList = [] }) {
  const [coinId, setCoinId] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [condition, setCondition] = useState("above");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!coinId || !targetPrice) return;

    onSubmit({
      coinId,
      targetPrice: parseFloat(targetPrice),
      condition,
    });

    setCoinId("");
    setTargetPrice("");
    setCondition("above");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 p-6 rounded-xl shadow-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 max-w-xl mx-auto"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
       Create Price Alert
      </h2>

      {/* Coin Selector */}
      <div className="space-y-0.5">
        <Label className="text-sm text-gray-600 dark:text-gray-300">Coin</Label>
        <CoinSearch
          coinList={coinList}
          onSelect={(coin) => setCoinId(coin.coinId)}
        />
      </div>

      {/* Target Price */}
      <div>
        <Label
          htmlFor="targetPrice"
          className="text-sm text-gray-600 dark:text-gray-300"
        >
          Target Price ($)
        </Label>
        <Input
          id="targetPrice"
          type="number"
          step="0.01"
          value={targetPrice}
          onChange={(e) => setTargetPrice(e.target.value)}
          placeholder="e.g. 30000"
          className="mt-1 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      {/* Condition Toggle */}
      <div className="flex items-center gap-6">
        <Label className="text-sm text-gray-600 dark:text-gray-300">
          Condition:
        </Label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="above"
            checked={condition === "above"}
            onChange={() => setCondition("above")}
            className="accent-blue-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-200">
            Above
          </span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="below"
            checked={condition === "below"}
            onChange={() => setCondition("below")}
            className="accent-blue-500"
          />
          <span className="text-sm text-gray-700 dark:text-gray-200">
            Below
          </span>
        </label>
      </div>  
      {/* Buttons */}
      <div className="flex flex-col items-center gap-2">
        <Button
          type="submit"
          className="px-5 py-1.5 text-sm font-medium bg-blue-600 hover:bg-blue-800 text-white rounded-md transition-all duration-300 shadow-sm"
        >
          Create Alert
        </Button>

        <Button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="px-5 py-1.5 text-sm font-medium bg-gray-700 hover:bg-gray-800 text-white rounded-md transition-all duration-300"
        >
          Go to Dashboard
        </Button>
      </div>
    </motion.form>
  );
}
