import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/redux/slices/cartSlice";
import searchReducer from "@/redux/slices/searchSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
