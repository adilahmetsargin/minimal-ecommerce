import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../data/products';

export interface CartItem {
  id: number;
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, size, color } = action.payload;
      const existingItem = state.items.find(
        item => item.id === id && item.size === size && item.color === color
      );
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    
    removeFromCart: (state, action: PayloadAction<{ id: number; size: string; color: string }>) => {
      const { id, size, color } = action.payload;
      state.items = state.items.filter(
        item => !(item.id === id && item.size === size && item.color === color)
      );
    },
    
    updateQuantity: (state, action: PayloadAction<{ id: number; size: string; color: string; quantity: number }>) => {
      const { id, size, color, quantity } = action.payload;
      const item = state.items.find(
        item => item.id === id && item.size === size && item.color === color
      );
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            item => !(item.id === id && item.size === size && item.color === color)
          );
        } else {
          item.quantity = quantity;
        }
      }
    },
    
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 