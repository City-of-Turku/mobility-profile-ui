import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  firstQuestion: {
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
  question7Answer: '',
  questionApiError: false,
};

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setFirstQuestion: (state, action) => {
      state.firstQuestion = action.payload;
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
    setQuestion7Answer: (state, action) => {
      state.question7Answer = action.payload;
    },
    setQuestionApiError: (state, action) => {
      state.questionApiError = action.payload;
    },
  },
});

export const {
  setFirstQuestion,
  setAllQuestions,
  setQuestionAnswer,
  setSubQuestionAnswer,
  setQuestion3Answer,
  setQuestion7Answer,
  setQuestionApiError,
} = questionSlice.actions;

export default questionSlice;
