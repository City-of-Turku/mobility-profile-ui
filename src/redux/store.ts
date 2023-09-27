import { configureStore } from '@reduxjs/toolkit';
import settingsSlice from './slices/settingsSlice';
import userSlice from './slices/userSlice';

export const store = () =>
  configureStore({
    reducer: {
      settings: settingsSlice.reducer,
      user: userSlice.reducer,
    },
  });

const state = store().getState;
const dispatch = store().dispatch;

export type RootState = ReturnType<typeof state>;
export type AppDispatch = typeof dispatch;

export default store;
