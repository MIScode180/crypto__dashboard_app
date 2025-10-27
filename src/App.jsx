import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "sonner";

import ProtectedRoute from "./Components/ProtectedRoute";
import { login } from "./Store/authSlice";

// Pages
import Home from "./Pages/HomePage";
import Login from "./Pages/Login";  
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Alerts from "./Pages/Alerts";
import WatchlistPage from "./Pages/WatchlistPage";
import Profile from "./Pages/Profile";
import CoinDetail from "./Pages/CoinDetail";

function App() {
  const dispatch = useDispatch();

  //  Restore user from localStorage on first load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(login(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  return (
    <Router>
      {/* Global Toaster for notifications */}
      <Toaster position="top-right" richColors closeButton duration={3000} />

      <Routes>
        {/*  Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/*  Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/coin/:id" element={<CoinDetail />} />
        </Route>

        {/* 404 Route */}
        <Route
          path="*"
          element={
            <div className="text-center py-24 text-2xl font-semibold text-red-500 dark:text-red-400">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

