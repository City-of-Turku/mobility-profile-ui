import { GetLocaleTextFunction } from '../types';

const renderLocaleValue = (getLocaleText: GetLocaleTextFunction, ...values: string[]) => {
  const localeTexts = {
    fi: values[0],
    en: values[1],
    sv: values[2],
  };
  return getLocaleText(localeTexts);
};

export { renderLocaleValue };
