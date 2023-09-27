import React from 'react';
import { Question, User } from '../types';

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

const startPoll = async (setUser: React.Dispatch<React.SetStateAction<User>>) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/question/start_poll', {
      method: 'POST',
    });
    const jsonData = await response.json();
    setUser(jsonData);
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.warn(message);
  }
};

const endPoll = async () => {
  try {
    await fetch('http://127.0.0.1:8000/api/v1/question/end_poll', {
      method: 'POST',
    });
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.warn(message);
  }
};

export { fetchQuestions, startPoll, endPoll };
