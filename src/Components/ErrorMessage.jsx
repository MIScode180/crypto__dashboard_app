import { AlertTriangle } from "lucide-react";

export default function ErrorMessage({ message = "Something went wrong." }) {
  return (
    <div className="flex items-center gap-2 p-4 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200">
      <AlertTriangle className="w-5 h-5" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
