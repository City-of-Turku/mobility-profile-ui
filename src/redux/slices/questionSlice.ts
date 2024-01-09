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
  questionAnswer: {
    question: 1,
    option: '1',
  },
  subQuestionAnswer: {
    question: 1,
    option: '1',
    sub_question: '1',
  },
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
    setQuestionAnswer: (state, action) => {
      state.questionAnswer = action.payload;
    },
    setSubQuestionAnswer: (state, action) => {
      state.subQuestionAnswer = action.payload;
    },
  },
});

export const { setQuestionId, setQuestionNumbers, setQuestionAnswer, setSubQuestionAnswer } =
  questionSlice.actions;

export default questionSlice;
