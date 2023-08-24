import React from 'react';
import { QuestionListItem } from '../types';

export const fetchQuestions = async (
  setData: React.Dispatch<React.SetStateAction<QuestionListItem[]>>,
) => {
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
