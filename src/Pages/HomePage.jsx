import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useGetTopCoinsQuery } from "../Api/coinApi";
import CoinCard from "../Components/CoinCard";
import { Button } from "@/components/ui/button";
import ThemeToggle from "../Components/ThemeToggle";

export default function Home() {
  const navigate = useNavigate();
  const { data: coins = [], isLoading, isError } = useGetTopCoinsQuery();

  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-indigo-900 via-black to-gray-900 text-white">
      <ThemeToggle />
      {/* Animated Background */}

      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl opacity-70 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-70 animate-pulse" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24 space-y-8">
        {/* Hero Section */}
        <motion.h1
          className="text-4xl sm:text-5xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Crypto Dashboard
        </motion.h1>
        <p className="text-gray-300 max-w-xl">
          Track real-time crypto prices, set alerts, and manage your personal
          watchlist — all in one place.
        </p>

       <div className="flex gap-4">
  <Button
    onClick={() => navigate("/login")}
    className="cursor-pointer transition duration-200"
  >
    Login
  </Button>

  <Button
    onClick={() => navigate("/register")}
    variant="outline"
    className="cursor-pointer bg-white text-black hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 transition duration-200"
  >
    Register
  </Button>
</div>


        
        

        {/* Coin Market Preview */}
        <div className="mt-12 w-full max-w-6xl">
          <h2 className="text-2xl font-semibold mb-6">🔥 Trending Coins</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              <p className="text-center col-span-full">Loading...</p>
            ) : isError ? (
              <p className="text-red-500 col-span-full">Error loading coins.</p>
            ) : (
              coins.map((coin) => (
                <CoinCard
                  key={coin.id}
                  coin={{
                    name: coin.name,
                    symbol: coin.symbol,
                    priceUsd: coin.current_price,
                    changePercent24Hr: coin.price_change_percentage_24h,
                    iconUrl: coin.image,
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useGetTopCoinsQuery } from "../Api/coinApi";
// import CoinCard from "../Components/CoinCard";
// import { Button } from "@/components/ui/button";
// import ThemeToggle from "../Components/ThemeToggle";

// export default function HomePage() {
//   const navigate = useNavigate();
//   const { data: coins = [], isLoading, isError } = useGetTopCoinsQuery();

//   return (
//     <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-indigo-900 via-black to-gray-900 text-white dark:from-gray-100 dark:via-white dark:to-gray-200 dark:text-black">
//       {/* Dark/Light Mode Switch */}
//       <ThemeToggle />

//       {/* Animated Background */}
//       <motion.div
//         className="absolute inset-0 z-0"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.1 }}
//         transition={{ duration: 1 }}
//       >
//         <div className="absolute top-0 left-0 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl opacity-70 animate-pulse" />
//         <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-70 animate-pulse" />
//       </motion.div>

//       <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24 space-y-8">
//         {/* Hero Section */}
//         <motion.h1
//           className="text-4xl sm:text-5xl font-bold"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           Crypto Dashboard
//         </motion.h1>
//         <p className="text-gray-300 dark:text-gray-700 max-w-xl">
//           Track real-time crypto prices, set alerts, and manage your personal watchlist — all in one place.
//         </p>

//         <div className="flex gap-4">
//           <Button onClick={() => navigate("/login")}>Login</Button>
//           <Button
//             variant="outline"
//             onClick={() => navigate("/register")}
//             className="bg-white text-black hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
//           >
//             Register
//           </Button>
//         </div>

//         {/* Coin Market Preview */}
//         <div className="mt-12 w-full max-w-6xl">
//           <h2 className="text-2xl font-semibold mb-6">🔥 Trending Coins</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//             {isLoading ? (
//               <p className="text-center col-span-full">Loading...</p>
//             ) : isError ? (
//               <p className="text-red-500 col-span-full">Error loading coins.</p>
//             ) : (
//               coins.map((coin) => (
//                 <CoinCard
//                   key={coin.id}
//                   coin={{
//                     name: coin.name,
//                     symbol: coin.symbol,
//                     priceUsd: coin.current_price,
//                     changePercent24Hr: coin.price_change_percentage_24h,
//                     iconUrl: coin.image,
//                   }}
//                 />
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
