import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  isCartVisible: boolean;
}

const initialState: UIState = {
  isCartVisible: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showCart(state) {
      state.isCartVisible = true;
    },
    hideCart(state) {
      state.isCartVisible = false;
    },
    toggleCart(state) {
      state.isCartVisible = !state.isCartVisible;
    },
  },
});

export const { showCart, hideCart, toggleCart } = uiSlice.actions;
export default uiSlice.reducer;
