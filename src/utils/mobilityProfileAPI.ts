import React from 'react';
import { Question, QuestionIdType } from '../types';

const apiUrl = process.env.REACT_APP_MOBILITY_PROFILE_API;
const tokenUrl = process.env.REACT_APP_MOBILITY_PROFILE_API_TOKEN;

const fetchToken = async () => {
  try {
    const response = await fetch(`${tokenUrl}/`);
    const jsonData = await response.json();
    return jsonData.csrfToken;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.warn(message);
  }
};

const fetchQuestions = async (setData: React.Dispatch<React.SetStateAction<Question[]>>) => {
  try {
    const response = await fetch(`${apiUrl}/question/?page_size=20`);
    const jsonData = await response.json();
    setData(jsonData.results);
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
    credentials: 'include',
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
    'X-CSRFToken': csrfToken,
  });

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: headers,
    credentials: 'include',
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

const hasQuestionCondition = async (questionId: number) => {
  const bodyObj = {
    question: questionId,
  };
  const requestOptions: RequestInit = {
    method: 'POST',
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

const isQuestionConditionMet = async ({ questionId, optionId, subQuestionId }: QuestionIdType) => {
  const bodyObj = {
    question: questionId,
    option: optionId,
    sub_question: subQuestionId,
  };
  const requestOptions: RequestInit = {
    method: 'POST',
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

const postQuestionAnswer = async ({ questionId, optionId, subQuestionId }: QuestionIdType) => {
  const bodyObj = {
    question: questionId,
    option: optionId,
    sub_question: subQuestionId,
  };
  const requestOptions: RequestInit = {
    method: 'POST',
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
  fetchToken,
  fetchQuestions,
  startPoll,
  endPoll,
  hasQuestionCondition,
  isQuestionConditionMet,
  postQuestionAnswer,
};
