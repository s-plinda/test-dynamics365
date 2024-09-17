import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice';
import truckReducer from './truck/truckSlice';
import uiReducer from './uiSlice/uiSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'truck'],
};


const rootReducer = combineReducers({
  cart: cartReducer,
  truck: truckReducer,
  ui: uiReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
