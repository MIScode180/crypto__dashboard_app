import AlertItem from "./AlertItem";

export default function AlertList({ alerts = [], coins = [], onDelete }) {
  const getCoinInfo = (coinId) =>
    coins.find((coin) => coin.coinId === coinId || coin.id === coinId) || {};

  if (!alerts.length) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No alerts added yet.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {alerts.map((alert) => (
        <AlertItem
          key={`${alert.coinId}-${alert.targetPrice}-${alert.condition}`}
          alert={alert}
          coinInfo={getCoinInfo(alert.coinId)}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

