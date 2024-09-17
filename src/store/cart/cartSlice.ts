import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState } from './types';
import { ICartItem } from '../../types';

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<ICartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      console.log(action.payload);
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    removeItemsByIds: (state, action: PayloadAction<number[]>) => {
      state.items = state.items.filter((item) => !action.payload.includes(item.id));
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart, removeItemsByIds } = cartSlice.actions;

export default cartSlice.reducer;
