import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  questionId: 1,
  allQuestions: [
    {
      id: 1,
      number: '1',
      question: '',
      question_fi: '',
      question_en: '',
      question_sv: '',
      description_fi: '',
      description_en: '',
      description_sv: '',
      options: [],
      sub_questions: [],
      sub_question: 0,
    },
  ],
  questionAnswer: [
    {
      question: 1,
      option: 1,
    },
  ],
  subQuestionAnswer: [
    {
      question: 1,
      option: 1,
      sub_question: 1,
    },
  ],
  question3Answer: {
    fi: '',
    en: '',
    sv: '',
  },
};

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestionId: (state, action: PayloadAction<number>) => {
      state.questionId = action.payload;
    },
    setAllQuestions: (state, action) => {
      state.allQuestions = action.payload;
    },
    setQuestionAnswer: (state, action) => {
      state.questionAnswer = action.payload;
    },
    setSubQuestionAnswer: (state, action) => {
      state.subQuestionAnswer = action.payload;
    },
    setQuestion3Answer: (state, action) => {
      state.question3Answer = action.payload;
    },
  },
});

export const {
  setQuestionId,
  setAllQuestions,
  setQuestionAnswer,
  setSubQuestionAnswer,
  setQuestion3Answer,
} = questionSlice.actions;

export default questionSlice;
