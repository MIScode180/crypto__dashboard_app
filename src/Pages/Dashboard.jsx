import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import PriceChart from "../components/PriceChart";
import CoinCard from "../components/CoinCard";
import FearGreedCard from "../Components/CryptoDetail/FearGreedCard";
import TrendingCoins from "../Components/CryptoDetail/TrendingCoins";
// import HomePage from '../Pages/HomePage';
import { getMarketChart } from "../services/chartService";
import ThemeToggle from "../Components/ThemeToggle";


export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [chartData, setChartData] = useState([]);

  const userName = user?.name || "Trader";
  const userAvatar = user?.prefs?.avatar || "/avatars/Avatar1.jpg";

  useEffect(() => {
    getMarketChart(selectedCoin, 1)
      .then(setChartData)
      .catch((err) => {
        console.error("❌ Chart fetch failed:", err);
        setChartData([]);
      });
  }, [selectedCoin]);

  return (
    
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >      
    <ThemeToggle />
    
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex justify-center items-center gap-4 mb-4">
          <img
            src={userAvatar}
            alt="User Avatar"
            className="w-14 h-14 rounded-full border-2 border-blue-500"
          />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Welcome, {userName}
          </h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400">
          Your real-time crypto dashboard is ready.
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        className="flex justify-center flex-wrap gap-4"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Button onClick={() => navigate("/")} variant="default">
          Home
          </Button>
        <Button onClick={() => navigate("/watchlist")} variant="outline">
          Watchlist
        </Button>
        <Button onClick={() => navigate("/alerts")} variant="outline">
          Alerts
        </Button>
        <Button onClick={() => navigate("/profile")} variant="outline">
          Profile
        </Button>
      </motion.div>

      {/* Chart + Info */}
      <div className="grid gap-6 md:grid-cols-3">
        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <PriceChart chartData={chartData} coinName={selectedCoin} />
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <CoinCard />
          <FearGreedCard />
        </motion.div>
      </div>

      {/* Trending */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Trending Coins
        </h2>
        <TrendingCoins onSelectCoin={setSelectedCoin} />
      </motion.div>
    </motion.div>
  );
}
