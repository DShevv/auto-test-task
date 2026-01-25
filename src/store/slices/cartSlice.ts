import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItemT, ProductT } from "../../api/types";
import { loadStoreFromLocalStorage, saveStoreToLocalStorage } from "../../utils";

const CART_STORAGE_KEY = 'shopping-cart';

interface CartState {
  items: CartItemT[];
}

const initialState: CartState = {
  items: loadStoreFromLocalStorage<CartState["items"]>(CART_STORAGE_KEY) || [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductT>) => {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }

      saveStoreToLocalStorage<CartState["items"]>(state.items, CART_STORAGE_KEY);
    },
    deleteFromCart: (state, action: PayloadAction<ProductT>) => {
      state.items = state.items.filter(item => item.product.id !== action.payload.id);
      saveStoreToLocalStorage<CartState["items"]>(state.items, CART_STORAGE_KEY);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number, quantity: number }>) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.product.id === id);
      if (existingItem) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.product.id !== id);
        } else {
          existingItem.quantity = quantity;
        }
      }
      saveStoreToLocalStorage<CartState["items"]>(state.items, CART_STORAGE_KEY);
    },
    clearCart: (state) => {
      state.items = [];
      saveStoreToLocalStorage<CartState["items"]>(state.items, CART_STORAGE_KEY);
    },
  },
  selectors: {
    selectCartItems: (state) => state.items,
    selectCartItemsCount: (state) => state.items.reduce((count, item) => count + item.quantity, 0),
    selectCartTotal: (state) => state.items.reduce((total, item) => total + item.product.price * item.quantity, 0),
  }
})

export const { addToCart, deleteFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const {
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal,
} = cartSlice.selectors;

export default cartSlice.reducer;