import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../types';

export const initialState: User = {
  userId: '',
  csrfToken: '',
  isAuthenticated: false,
  profileResult: {
    id: 0,
    topic: '',
    topic_fi: '',
    topic_en: '',
    topic_sv: '',
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
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setProfileResult: (state, action) => {
      state.profileResult = action.payload;
    },
    resetUserId: (state) => {
      state.userId = '';
    },
    resetCsrfToken: (state) => {
      state.csrfToken = '';
    },
    resetProfileResult: (state) => {
      state.profileResult = {
        id: 0,
        topic: '',
        topic_fi: '',
        topic_en: '',
        topic_sv: '',
        value_fi: '',
        value_en: '',
        value_sv: '',
        description_fi: '',
        description_en: '',
        description_sv: '',
      };
    },
  },
});

export const {
  setUserId,
  setCsrfToken,
  setIsAuthenticated,
  setProfileResult,
  resetUserId,
  resetCsrfToken,
  resetProfileResult,
} = userSlice.actions;

export default userSlice;
