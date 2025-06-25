import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '../supabaseClient';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export interface CartItem {
  id: number;
  user_id: string;
  product_id: number;
  quantity: number;
  product: Product;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk<CartItem[], string>(
  'cart/fetchCart',
  async (userId, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from('cart')
      .select('*, product:product_id(*)')
      .eq('user_id', userId);
    if (error) return rejectWithValue(error.message);
    return data as CartItem[];
  }
);

export const addToCart = createAsyncThunk<
  void,
  { userId: string; productId: number; quantity?: number },
  { state: { cart: CartState } }
>(
  'cart/addToCart',
  async ({ userId, productId, quantity = 1 }, { dispatch, rejectWithValue }) => {
    const { error } = await supabase
      .from('cart')
      .insert([{ user_id: userId, product_id: productId, quantity }]);
    if (error) return rejectWithValue(error.message);
    await dispatch(fetchCart(userId));
  }
);

export const updateCartItem = createAsyncThunk<
  void,
  { userId: string; cartItemId: number; quantity: number },
  { state: { cart: CartState } }
>(
  'cart/updateCartItem',
  async ({ userId, cartItemId, quantity }, { dispatch, getState, rejectWithValue }) => {
    // Optimistic update already applied
    const { error } = await supabase
      .from('cart')
      .update({ quantity })
      .eq('id', cartItemId)
      .eq('user_id', userId);
    if (error) {
      // Revert on error
      const prevItem = getState().cart.items.find(i => i.id === cartItemId);
      if (prevItem) {
        dispatch(cartSlice.actions.localUpdateQuantity({ cartItemId, quantity: prevItem.quantity }));
      }
      return rejectWithValue(error.message);
    }
  }
);

export const removeCartItem = createAsyncThunk<
  void,
  { userId: string; cartItemId: number },
  { state: { cart: CartState } }
>(
  'cart/removeCartItem',
  async ({ userId, cartItemId }, { dispatch, getState, rejectWithValue }) => {
    // Optimistic remove already applied
    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('id', cartItemId)
      .eq('user_id', userId);
    if (error) {
      // Revert on error
      const prevItem = getState().cart.items.find(i => i.id === cartItemId);
      if (prevItem) {
        dispatch(cartSlice.actions.localAddItem(prevItem));
      }
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    localUpdateQuantity: (state, action: PayloadAction<{ cartItemId: number; quantity: number }>) => {
      state.items = state.items.map(item =>
        item.id === action.payload.cartItemId ? { ...item, quantity: action.payload.quantity } : item
      );
    },
    localRemoveItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    localAddItem: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { localUpdateQuantity, localRemoveItem, localAddItem } = cartSlice.actions;
export default cartSlice.reducer; 