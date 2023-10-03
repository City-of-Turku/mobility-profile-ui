export interface TextBasicRequiredProps {
  text: string;
}

export interface TextBasicOptionalProps {
  isTitle: boolean;
}

export interface SettingsState {
  localeSelection: string;
}

export interface User {
  userId: string;
  csrfToken: string;
}

export interface LocaleTextObject {
  [key: string]: string | undefined;
}

export interface QuestionListProps {
  itemsPerPage: number;
}

export interface Option {
  id: number;
  value: string;
  value_fi: string;
  value_en: string;
  value_sv: string;
}

export interface SubQuestion {
  id: number;
  description_fi: string;
  description_en: string;
  description_sv: string;
  options: Option[];
}

export interface Question {
  id: number;
  number: string;
  question: string;
  question_fi: string;
  question_en: string;
  question_sv: string;
  description_fi: string;
  description_en: string;
  description_sv: string;
  options: Option[];
  sub_questions: SubQuestion[];
}

export interface ListItemCheckBoxProps {
  question: Question;
}

export interface ListItemRadioProps {
  question: Question;
}
