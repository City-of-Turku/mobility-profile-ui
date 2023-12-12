import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types';

export const initialState: User = {
  userId: '',
  csrfToken: '',
  profileResult: {
    id: 0,
    value: '',
    value_fi: '',
    value_en: '',
    value_sv: '',
    description_fi: '',
    description_en: '',
    description_sv: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setCsrfToken: (state, action: PayloadAction<string>) => {
      state.csrfToken = action.payload;
    },
    setProfileResult: (state, action) => {
      state.profileResult = action.payload;
    },
  },
});

export const { setUserId, setCsrfToken, setProfileResult } = userSlice.actions;

export default userSlice;
