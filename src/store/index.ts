import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();;
export const useAppSelector = useSelector.withTypes<RootState>();

export * from './slices/cartSlice';
export * from './slices/themeSlice';