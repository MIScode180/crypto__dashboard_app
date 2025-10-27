import { Button } from "@/components/ui/button";

export default function AlertItem({ alert, coinInfo = {}, onDelete }) {
  const { coinId, targetPrice, condition } = alert;
  const { name, symbol, iconUrl = "/icons/default-coin.png" } = coinInfo;

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src={iconUrl}
          alt={symbol || "coin"}
          className="w-9 h-9 rounded-full border dark:border-gray-600"
        />
        <div>
          <p className="font-medium text-gray-800 dark:text-white">{name || coinId}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Notify when {condition} ${parseFloat(targetPrice).toFixed(2)}
          </p>
        </div>
      </div>

      {onDelete && (
        <Button size="sm" variant="destructive" onClick={() => onDelete(alert)}>
          Remove
        </Button>
      )}
    </div>
  );
}
