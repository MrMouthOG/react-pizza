import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import filter from "./slices/filterSlice";
import cart from './slices/cartSlice';
import pizzas from "./slices/pizzasSlice";

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizzas
  }
})

export type RootStore = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()