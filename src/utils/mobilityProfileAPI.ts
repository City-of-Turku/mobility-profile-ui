import React from 'react';
import { PostalCode, Question, QuestionAnswer, Result, UserFormTypes } from '../types';

const apiBaseUrl = process.env.REACT_APP_MOBILITY_PROFILE_API;
const apiVersion = process.env.REACT_APP_MOBILITY_PROFILE_API_VERSION;
const apiUrl = `${apiBaseUrl}${apiVersion}`;

const serviceMapAPI = process.env.REACT_APP_SERVICEMAP_API;

const fetchQuestions = async (
  setData: React.Dispatch<React.SetStateAction<Question[]>>,
  setError: (a: boolean) => void,
) => {
  try {
    const response = await fetch(`${apiUrl}/question/?page_size=25`);
    const jsonData = await response.json();
    setData(jsonData.results);
  } catch (error) {
    setError(true);
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.warn(message);
  }
};

const fetchQuestionsWithConditions = async (
  setData: React.Dispatch<React.SetStateAction<Question[]>>,
) => {
  try {
    const response = await fetch(`${apiUrl}/question/get_questions_with_conditions/?page_size=20`);
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

const fetchQuestionStates = async (token: string) => {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`,
  });

  const requestOptions: RequestInit = {
    headers: headers,
    credentials: 'include',
  };

  try {
    const response = await fetch(
      `${apiUrl}/question/get_questions_conditions_states/`,
      requestOptions,
    );
    const jsonData = await response.json();
    const values = jsonData;
    return values;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.warn(message);
  }
};

const fetchUserResult = async (
  token: string,
  setData: React.Dispatch<React.SetStateAction<Result>>,
) => {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`,
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

const startPoll = async (captchaValue: string, setAuth: (a: boolean) => void) => {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });
  const bodyObj = {
    token: captchaValue,
  };
  const requestOptions: RequestInit = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(bodyObj),
  };

  try {
    const response = await fetch(`${apiUrl}/question/start_poll/`, requestOptions);
    const jsonData = await response.json();
    const userValues = jsonData;
    setAuth(true);
    return userValues;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.warn(message);
  }
};

const logoutUser = async (token: string) => {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`,
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

const hasQuestionCondition = async (questionId: number, token: string) => {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`,
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
    if (conditionValue.in_condition) {
      return true;
    } else return false;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.warn(message);
  }
};

const fetchQuestionConditionMet = async (questionId: number, token: string) => {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`,
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
    return conditionValue;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.warn(message);
  }
};

const fetchSubQuestionConditionMet = async (subQuestionId: number, token: string) => {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`,
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
    if (conditionValue?.condition_met) {
      return true;
    } else return false;
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.warn(message);
  }
};

const postQuestionAnswer = async (
  questionAnswer: QuestionAnswer,
  otherValue: string,
  token: string,
) => {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`,
  });

  const isOther = questionAnswer.other;

  const questionAnswerDefault = {
    question: questionAnswer.question,
    option: questionAnswer.option,
  };

  const questionAnswerExtended = {
    question: questionAnswer.question,
    option: questionAnswer.option,
    other: otherValue,
  };

  const questionAnswerObj = isOther ? questionAnswerExtended : questionAnswerDefault;

  const subQuestionAnswerDefault = {
    question: questionAnswer.question,
    option: questionAnswer.option,
    sub_question: questionAnswer.sub_question,
  };

  const subQuestionAnswerExtended = {
    question: questionAnswer.question,
    option: questionAnswer.option,
    sub_question: questionAnswer.sub_question,
    other: otherValue,
  };

  const subQuestionanswerObj = isOther ? subQuestionAnswerExtended : subQuestionAnswerDefault;

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: headers,
    credentials: 'include',
    body: JSON.stringify(questionAnswer.sub_question ? subQuestionanswerObj : questionAnswerObj),
  };

  try {
    const response = await fetch(`${apiUrl}/answer/`, requestOptions);
    if (response.ok) {
      return response.status;
    }
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.warn(message);
  }
};

const postUserInfo = async (
  data: UserFormTypes,
  userId: string,
  setAnswerStatus: (a: boolean) => void,
  setError: (a: boolean) => void,
  token: string,
) => {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`,
  });

  const requestOptions: RequestInit = {
    method: 'PUT',
    headers: headers,
    credentials: 'include',
    body: JSON.stringify(data),
  };

  try {
    await fetch(`${apiBaseUrl}/account/profile/${userId}/`, requestOptions);
    setAnswerStatus(true);
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    setError(true);
    console.warn(message);
  }
};

const postSubscribeInfo = async (
  email: string,
  resultId: number,
  setAnswer: (a: boolean) => void,
  setError: (a: boolean) => void,
  token: string,
) => {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`,
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
    await fetch(`${apiBaseUrl}/account/profile/subscribe/`, requestOptions);
    setAnswer(true);
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    setError(true);
    console.warn(message);
  }
};

const fetchPostalCodes = async (
  setData: React.Dispatch<React.SetStateAction<PostalCode[]>>,
  setError: (a: boolean) => void,
) => {
  try {
    const response = await fetch(
      `${serviceMapAPI}/administrative_division/?type=postcode_area&page=1&page_size=100`,
    );
    const jsonData = await response.json();
    setData(jsonData.results);
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    setError(true);
    console.warn(message);
  }
};

export {
  fetchQuestions,
  fetchQuestionsWithConditions,
  fetchOneQuestion,
  fetchQuestionStates,
  fetchUserResult,
  startPoll,
  logoutUser,
  hasQuestionCondition,
  fetchQuestionConditionMet,
  fetchSubQuestionConditionMet,
  postQuestionAnswer,
  postUserInfo,
  postSubscribeInfo,
  fetchPostalCodes,
};
