import React from 'react';
import { Question, QuestionIdType, QuestionNumber, Result } from '../types';

const apiUrl = process.env.REACT_APP_MOBILITY_PROFILE_API;

const fetchQuestions = async (setData: React.Dispatch<React.SetStateAction<Question[]>>) => {
  try {
    const response = await fetch(`${apiUrl}/question/?page_size=25`);
    const jsonData = await response.json();
    setData(jsonData.results);
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.warn(message);
  }
};

const fetchQuestionNumbers = async (
  setData: React.Dispatch<React.SetStateAction<QuestionNumber[]>>,
) => {
  try {
    const response = await fetch(`${apiUrl}/question/get_question_numbers/?page_size=30`);
    const jsonData = await response.json();
    setData(jsonData.results);
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.warn(message);
  }
};

const fetchOneQuestion = async (
  questionId: number,
  setData: React.Dispatch<React.SetStateAction<Question>>,
) => {
  try {
    const response = await fetch(`${apiUrl}/question/${questionId}/`);
    const jsonData = await response.json();
    setData(jsonData);
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.warn(message);
  }
};

const fetchProfileResults = async (setData: React.Dispatch<React.SetStateAction<Result[]>>) => {
  try {
    const response = await fetch(`${apiUrl}/result/`);
    const jsonData = await response.json();
    setData(jsonData.results);
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.warn(message);
  }
};

const fetchUserResult = async (setData: React.Dispatch<React.SetStateAction<Result>>) => {
  try {
    const response = await fetch(`${apiUrl}/answer/get_result/`);
    const jsonData = await response.json();
    setData(jsonData);
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.warn(message);
  }
};

const startPoll = async () => {
  const requestOptions: RequestInit = {
    method: 'POST',
  };

  try {
    const response = await fetch(`${apiUrl}/question/start_poll/`, requestOptions);
    const jsonData = await response.json();
    const userValues = jsonData;
    return userValues;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.warn(message);
  }
};

const endPoll = async (csrfToken: string) => {
  const headers = new Headers({
    'X-CSRFTOKEN': csrfToken,
  });

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: headers,
  };

  try {
    await fetch(`${apiUrl}/question/end_poll/`, requestOptions);
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.warn(message);
  }
};

const hasQuestionCondition = async (questionId: number, csrfToken: string) => {
  const headers = new Headers({
    'X-CSRFTOKEN': csrfToken,
  });
  const bodyObj = {
    question: questionId,
  };
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(bodyObj),
  };

  try {
    const response = await fetch(`${apiUrl}/question/in_condition/`, requestOptions);
    const jsonData = await response.json();
    const conditionValue = jsonData;
    return conditionValue?.in_condition;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.warn(message);
  }
};

const isQuestionConditionMet = async ({ questionId }: QuestionIdType, csrfToken: string) => {
  const headers = new Headers({
    'X-CSRFToken': csrfToken,
  });
  const bodyObj = {
    question: questionId,
  };
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(bodyObj),
  };

  try {
    const response = await fetch(`${apiUrl}/question/check_if_condition_met/`, requestOptions);
    const jsonData = await response.json();
    const conditionValue = jsonData;
    return conditionValue?.condition_met;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.warn(message);
  }
};

const postQuestionAnswer = async (
  { questionId, optionId, subQuestionId }: QuestionIdType,
  csrfToken: string,
) => {
  const headers = new Headers({
    'X-CSRFToken': csrfToken,
  });

  const bodyObj = {
    question: questionId,
    option: optionId,
    sub_question: subQuestionId,
  };
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(bodyObj),
  };

  try {
    const response = await fetch(`${apiUrl}/answer/`, requestOptions);
    const jsonData = await response.json();
    const conditionValue = jsonData;
    return conditionValue?.condition_met;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.warn(message);
  }
};

export {
  fetchQuestions,
  fetchOneQuestion,
  fetchQuestionNumbers,
  fetchProfileResults,
  fetchUserResult,
  startPoll,
  endPoll,
  hasQuestionCondition,
  isQuestionConditionMet,
  postQuestionAnswer,
};
