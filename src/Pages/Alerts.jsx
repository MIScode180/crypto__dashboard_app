import React, { useEffect, useState } from "react";
import AlertForm from "../Components/AlertForm";
import AlertList from "../Components/AlertList";
import { getAllCoins } from "../Api/coinApi";                   // Fetch coin list (id, name, symbol)

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [coinList, setCoinList] = useState([]);

  // Load saved alerts from localStorage
  useEffect(() => {
    const savedAlerts = JSON.parse(localStorage.getItem("priceAlerts")) || [];
    setAlerts(savedAlerts);
  }, []);

  // Load coin data
  useEffect(() => {
    getAllCoins().then(setCoinList);
  }, []);

  // Save alerts to localStorage
  const saveAlerts = (updated) => {
    setAlerts(updated);
    localStorage.setItem("priceAlerts", JSON.stringify(updated));
  };

  const handleAddAlert = (alert) => {
    const updated = [...alerts, alert];
    saveAlerts(updated);
  };

  const handleDeleteAlert = (alertToRemove) => {
    const updated = alerts.filter(
      (a) =>
        !(
          a.coinId === alertToRemove.coinId &&
          a.targetPrice === alertToRemove.targetPrice &&
          a.condition === alertToRemove.condition
        )
    );
    saveAlerts(updated);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-8 dark:bg-black bg-white">
      <div className="w-full max-w-xl">
        <AlertForm onSubmit={handleAddAlert} coinList={coinList} />
        <AlertList alerts={alerts} coins={coinList} onDelete={handleDeleteAlert} />
      </div>
    </div>
  );
}
