import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster } from "sonner";

import ProtectedRoute from "./components/ProtectedRoute";
import { login } from "./Store/authSlice";

// Pages
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import WatchlistPage from "./pages/WatchlistPage";
import Profile from "./pages/Profile";
import CoinDetail from "./pages/CoinDetail";

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

