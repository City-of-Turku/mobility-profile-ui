import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  questionId: 1,
  questionNumbers: [
    {
      id: 1,
      number: '1',
    },
  ],
};

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestionId: (state, action: PayloadAction<number>) => {
      state.questionId = action.payload;
    },
    setQuestionNumbers: (state, action) => {
      state.questionNumbers = action.payload;
    },
  },
});

export const { setQuestionId, setQuestionNumbers } = questionSlice.actions;

export default questionSlice;
