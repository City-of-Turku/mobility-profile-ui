import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { SettingsState } from '../../types';

export const initialState: SettingsState = {
  localeSelection: 'fi',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLocaleSelection: (state, action: PayloadAction<string>) => {
      state.localeSelection = action.payload;
    },
  },
});

export const { setLocaleSelection } = settingsSlice.actions;

export default settingsSlice;
