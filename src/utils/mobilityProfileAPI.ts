import React from 'react';
import { Question } from '../types';

const fetchToken = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/csrf/');
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
    const response = await fetch('http://127.0.0.1:8000/api/v1/question/?page_size=20');
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
    const response = await fetch(
      'http://127.0.0.1:8000/api/v1/question/start_poll/',
      requestOptions,
    );
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
    await fetch('http://127.0.0.1:8000/api/v1/question/end_poll/', requestOptions);
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.warn(message);
  }
};

export { fetchToken, fetchQuestions, startPoll, endPoll };
