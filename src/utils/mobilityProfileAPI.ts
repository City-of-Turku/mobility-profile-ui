import React from 'react';
import {
  Question,
  QuestionAnswer,
  QuestionIdType,
  QuestionNumber,
  Result,
  UserFormTypes,
} from '../types';

const apiBaseUrl = process.env.REACT_APP_MOBILITY_PROFILE_API;
const apiVersion = process.env.REACT_APP_MOBILITY_PROFILE_API_VERSION;
const apiUrl = `${apiBaseUrl}${apiVersion}`;

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

const fetchUserResult = async (
  csrfToken: string,
  setData: React.Dispatch<React.SetStateAction<Result>>,
) => {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Token ${csrfToken}`,
  });

  const requestOptions: RequestInit = {
    headers: headers,
    credentials: 'include',
  };

  try {
    const response = await fetch(`${apiUrl}/answer/get_result/`, requestOptions);
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
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: headers,
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

const logoutUser = async (csrfToken: string) => {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Token ${csrfToken}`,
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

const hasQuestionCondition = async (questionId: number, csrfToken: string) => {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Token ${csrfToken}`,
  });
  const bodyObj = {
    question: questionId,
  };
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: headers,
    credentials: 'include',
    body: JSON.stringify(bodyObj),
  };

  try {
    const response = await fetch(`${apiUrl}/question/in_condition/`, requestOptions);
    const jsonData = await response.json();
    const conditionValue = jsonData;
    return conditionValue;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.warn(message);
  }
};

const isQuestionConditionMet = async ({ questionId }: QuestionIdType, csrfToken: string) => {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Token ${csrfToken}`,
  });
  const bodyObj = {
    question: questionId,
  };
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: headers,
    credentials: 'include',
    body: JSON.stringify(bodyObj),
  };

  try {
    const response = await fetch(
      `${apiUrl}/question/check_if_question_condition_met/`,
      requestOptions,
    );
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

const isSubQuestionConditionMet = async ({ subQuestionId }: QuestionIdType, csrfToken: string) => {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Token ${csrfToken}`,
  });
  const bodyObj = {
    sub_question: subQuestionId,
  };
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: headers,
    credentials: 'include',
    body: JSON.stringify(bodyObj),
  };

  try {
    const response = await fetch(
      `${apiUrl}/question/check_if_sub_question_condition_met/`,
      requestOptions,
    );
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

const postQuestionAnswer = async (questionAnswer: QuestionAnswer, csrfToken: string) => {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Token ${csrfToken}`,
  });

  const questionAnswerObj = {
    question: questionAnswer.question,
    option: questionAnswer.option,
  };

  const subQuestionanswerObj = {
    question: questionAnswer.question,
    option: questionAnswer.option,
    sub_question: questionAnswer.sub_question,
  };

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: headers,
    credentials: 'include',
    body: JSON.stringify(questionAnswer.sub_question ? subQuestionanswerObj : questionAnswerObj),
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

const postUserInfo = async (data: UserFormTypes, userId: string, csrfToken: string) => {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Token ${csrfToken}`,
  });

  const requestOptions: RequestInit = {
    method: 'PUT',
    headers: headers,
    credentials: 'include',
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${apiBaseUrl}/account/profile/${userId}/`, requestOptions);
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

const postSubscribeInfo = async (email: string, resultId: number, csrfToken: string) => {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Token ${csrfToken}`,
  });

  const emailData = {
    email: email,
    result: resultId,
  };

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: headers,
    credentials: 'include',
    body: JSON.stringify(emailData),
  };

  try {
    const response = await fetch(`${apiBaseUrl}/account/profile/subscribe/`, requestOptions);
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
  fetchUserResult,
  startPoll,
  logoutUser,
  hasQuestionCondition,
  isQuestionConditionMet,
  isSubQuestionConditionMet,
  postQuestionAnswer,
  postUserInfo,
  postSubscribeInfo,
};
