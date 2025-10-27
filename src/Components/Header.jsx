import { motion } from "framer-motion";
import { Button } from "@/Components/ui/button";
import ThemeToggle from "./ThemeToggle";
import AvatarPicker from "./AvatarPicker";

export default function Header({ onLogout }) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full px-4 py-3 bg-white dark:bg-gray-900 shadow-md flex items-center justify-between"
    >
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        🪙 Crypto Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <AvatarPicker />
        {onLogout && (
          <Button variant="outline" onClick={onLogout}>
            Logout
          </Button>
        )}
      </div>
    </motion.header>
  );
}
