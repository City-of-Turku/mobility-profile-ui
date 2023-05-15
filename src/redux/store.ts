import { configureStore } from '@reduxjs/toolkit';
import settingsSlice from './slices/settingsSlice';

export const store = () =>
  configureStore({
    reducer: {
      settings: settingsSlice.reducer,
    },
  });

const state = store().getState;
const dispatch = store().dispatch;

export type RootState = ReturnType<typeof state>;
export type AppDispatch = typeof dispatch;

export default store;
