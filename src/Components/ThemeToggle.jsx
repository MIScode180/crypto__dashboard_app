import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/Components/ui/button";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className="absolute top-5 right-5 z-50">
      <Button
        onClick={toggleTheme}
        variant="outline"
        className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 bg-white text-black hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
      >
        {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </Button>
    </div>
  );
}
