import { createSlice } from '@reduxjs/toolkit';
import { products } from '../data/products';
import type { Product } from '../data/products';

interface ProductState {
  items: Product[];
}

const initialState: ProductState = {
  items: products,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // We can add reducers for filtering, sorting, etc. later
  },
});

export default productSlice.reducer; 