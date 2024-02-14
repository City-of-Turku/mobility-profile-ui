import { GetLocaleTextFunction, Question } from '../types';

const renderLocaleValue = (getLocaleText: GetLocaleTextFunction, ...values: string[]) => {
  const localeTexts = {
    fi: values[0],
    en: values[1],
    sv: values[2],
  };
  return getLocaleText(localeTexts);
};

/**
 * Sort questions because default order is wrong.
 * @param questionsData
 * @returns array of objects
 */
const sortQuestionsData = (questionsData: Question[]) => {
  return questionsData?.sort((a, b) => {
    const numA = parseInt(a.number, 10);
    const numB = parseInt(b.number, 10);

    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    } else {
      return a.number.localeCompare(b.number);
    }
  });
};

export { renderLocaleValue, sortQuestionsData };
