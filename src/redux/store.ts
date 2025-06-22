import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../slices/productSlice';
import authReducer from '../slices/authSlice';
import favoritesReducer from '../slices/favoritesSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 