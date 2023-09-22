import { useCallback } from 'react';
import { useAppSelector } from '../hooks/reduxHooks';
import { LocaleTextObject } from '../types';

// This returns correct string from text object according to locale
export const getLocaleString = (locale: string, obj: LocaleTextObject): string => {
  let value;
  Object.keys(obj).forEach((key) => {
    if (key === locale && obj[key]) {
      value = obj[key];
    }
  });
  // Default rerturned string is the first one listed that is not empty string
  if (!value) {
    value = Object.values(obj).find((value) => value?.length);
  }
  return value || '';
};

const useLocaleText = () => {
  const { settings } = useAppSelector((state) => state);
  const locale = settings.localeSelection;
  return useCallback((obj: LocaleTextObject) => getLocaleString(locale, obj), [locale]);
};

export default useLocaleText;
