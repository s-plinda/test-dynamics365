import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from '../../types';
import { ITrucksState, ITruckState } from './types';

const initialState: ITrucksState = {
  trucks: [],
  selectedTruckId: null,
  nextTruckNumber: 1
};

export const truckSlice = createSlice({
  name: 'truck',
  initialState,
  reducers: {
    addTruck: (state, action: PayloadAction<Omit<ITruckState, 'id' | 'truckNumber'>>) => {
      const newTruck: ITruckState = {
        ...action.payload,
        id: Date.now(),
        truckNumber: state.nextTruckNumber,
      };
      state.nextTruckNumber += 1;
      state.trucks.push(newTruck);
      state.selectedTruckId = newTruck.id;
    },
    selectTruck: (state, action: PayloadAction<number>) => {
      state.selectedTruckId = action.payload;
    },
    addItemToTruck: (state, action: PayloadAction<ICartItem>) => {
      const { selectedTruckId } = state;
      if (!selectedTruckId) return;

      const truckIndex = state.trucks.findIndex(
        (truck) => truck.id === selectedTruckId
      );
      if (truckIndex === -1) return;

      const updatedItems = [...state.trucks[truckIndex].items, action.payload];

      const updatedTruck = {
        ...state.trucks[truckIndex],
        items: updatedItems,
      };

      state.trucks = [
        ...state.trucks.slice(0, truckIndex),
        updatedTruck,
        ...state.trucks.slice(truckIndex + 1),
      ];
    },
    removeItemFromTruck: (state, action: PayloadAction<number>) => {
      const { selectedTruckId } = state;
      if (!selectedTruckId) return;

      const truckIndex = state.trucks.findIndex(
        (truck) => truck.id === selectedTruckId
      );
      if (truckIndex === -1) return;

      const updatedItems = state.trucks[truckIndex].items.filter(
        (item) => item.id !== action.payload
      );

      state.trucks[truckIndex] = {
        ...state.trucks[truckIndex],
        items: updatedItems,
      };
    },
    removeTruck: (state, action: PayloadAction<number>) => {
      state.trucks = state.trucks.filter((truck) => truck.id !== action.payload);
      if (state.selectedTruckId === action.payload) {
        state.selectedTruckId = null;
      }
    },
  },
});

export const {
  addItemToTruck,
  removeItemFromTruck,
  addTruck,
  removeTruck,
  selectTruck,
} = truckSlice.actions;

export default truckSlice.reducer;
