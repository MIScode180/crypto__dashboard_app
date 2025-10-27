import { configureStore } from "@reduxjs/toolkit";
import { coinApi } from "../Api/coinApi";
import { authApi } from "../Api/authApi";
import { fearGreedApi } from "@/Api/fearGreedApi";

import authSlice from "../Store/authSlice";
import watchlistSlice from "../Store/watchlistSlice"; //  ADD THIS

export const store = configureStore({
  reducer: {
    [coinApi.reducerPath]: coinApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [fearGreedApi.reducerPath]: fearGreedApi.reducer,
    auth: authSlice,
    watchlist: watchlistSlice, //  REGISTER WATCHLIST HERE
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      coinApi.middleware,
      authApi.middleware,
      fearGreedApi.middleware
    ),

});
