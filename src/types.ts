interface SettingsState {
  localeSelection: string;
}

interface User {
  userId: string;
  csrfToken: string;
  profileResult: Result;
}

interface LocaleTextObject {
  [key: string]: string | undefined;
}

interface QuestionListProps {
  itemsPerPage: number;
}

interface Option {
  id: number;
  value: string;
  value_fi: string;
  value_en: string;
  value_sv: string;
  sub_question: string;
}

interface SubQuestion {
  id: number;
  description_fi: string;
  description_en: string;
  description_sv: string;
  options: Option[];
}

interface Question {
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
  sub_question: number;
}

interface QuestionNumber {
  id: number;
  number: string;
}

interface QuestionAnswer {
  questionAnswer: {
    question: number;
    option: string;
  };
}

interface SubQuestionAnswer {
  subQuestionAnswer: {
    question: number;
    option: string;
    sub_question: string;
  };
}

interface ListItemCheckBoxProps {
  question: Question;
}

interface ListItemRadioProps {
  question: Question;
}

interface QuestionIdType {
  questionId: number;
  optionId: number;
  subQuestionId: number;
}

interface Result {
  id: number;
  value: string;
  value_fi: string;
  value_en: string;
  value_sv: string;
  description_fi: string;
  description_en: string;
  description_sv: string;
}

interface GetLocaleTextFunction {
  (localeTexts: { fi: string; en: string; sv: string }): string;
}

interface EmailField {
  email: string;
}

interface UserFormTypes {
  postal_code: string;
  optional_postal_code: string;
  is_filled_for_fun: boolean;
  result_can_be_used: boolean;
}

interface LinkButtonProps {
  urlValue: string;
  translationId: string;
}

export {
  SettingsState,
  User,
  LocaleTextObject,
  QuestionListProps,
  Option,
  Question,
  SubQuestion,
  QuestionNumber,
  QuestionAnswer,
  SubQuestionAnswer,
  ListItemCheckBoxProps,
  ListItemRadioProps,
  QuestionIdType,
  Result,
  GetLocaleTextFunction,
  EmailField,
  UserFormTypes,
  LinkButtonProps,
};
