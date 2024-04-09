import { ReactElement } from 'react';

type ReactChild = ReactElement;

type ReactNode = ReactChild | boolean | null | undefined;

interface SettingsState {
  localeSelection: string;
}

interface User {
  userId: string;
  csrfToken: string;
  isLoggedIn: boolean;
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
  is_other?: boolean;
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
  number_of_options_to_choose?: string;
  options: Option[];
  sub_questions: SubQuestion[];
  sub_question: number;
}

interface QuestionAnswer {
  question: number;
  option: number;
  sub_question?: string | number;
  other?: boolean;
}

interface TableCommonProps {
  question: Question;
}

interface TableExtendedProps {
  questionData: Question;
}

interface QuestionIdType {
  questionId: number;
  optionId: number;
  subQuestionId: number;
}

interface Result {
  id: number;
  topic: string;
  topic_fi: string;
  topic_en: string;
  topic_sv: string;
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
  gender: string | null;
  year_of_birth: number;
  postal_code?: string | null;
  postal_code_other?: string | null;
  optional_postal_code?: string | null;
  optional_postal_code_other?: string | null;
  is_filled_for_fun: boolean;
  result_can_be_used: boolean;
}

interface UserFormProps {
  answerStatus: boolean;
  setAnswerStatus: (a: boolean) => void;
}

interface LinkButtonProps {
  urlValue: string;
  translationId: string;
  isActive: boolean;
}

interface TextBasicProps {
  translationId: string;
}

interface ErrorComponentProps {
  translationId: string;
  children?: ReactNode;
}

interface PostalCode {
  id: number;
  name: {
    fi: string;
    sv: string;
    en: string;
  };
}

interface ResultImageProps {
  topic: string;
}

interface ProtectedRouteProps {
  children: ReactNode;
}

export {
  SettingsState,
  User,
  LocaleTextObject,
  QuestionListProps,
  Option,
  Question,
  SubQuestion,
  QuestionAnswer,
  TableCommonProps,
  TableExtendedProps,
  QuestionIdType,
  Result,
  GetLocaleTextFunction,
  EmailField,
  UserFormTypes,
  UserFormProps,
  LinkButtonProps,
  TextBasicProps,
  ErrorComponentProps,
  PostalCode,
  ResultImageProps,
  ProtectedRouteProps,
};
