import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import watchlistService from "@/appwrite/WatchlistService";

export const fetchWatchlist = createAsyncThunk(
  "watchlist/fetch",
  async (userId) => await watchlistService.getWatchlist(userId)
);

export const addWatchlistCoin = createAsyncThunk(
  "watchlist/add",
  async ({ userId, coin }) => {
    await watchlistService.addToWatchlist({ userId, ...coin });
    return await watchlistService.getWatchlist(userId);
  }
);

export const deleteWatchlistCoin = createAsyncThunk(
  "watchlist/delete",
  async ({ userId, documentId }) => {
    await watchlistService.removeFromWatchlist(documentId);
    return await watchlistService.getWatchlist(userId);
  }
);

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchlist.pending, (state) => { state.loading = true; })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addWatchlistCoin.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(deleteWatchlistCoin.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default watchlistSlice.reducer;