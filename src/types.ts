export interface TextBasicProps {
  isTitle: boolean;
  text: string;
}

export interface SettingsState {
  localeSelection: string;
}

export interface QuestionListProps {
  itemsPerPage: number;
}

export interface Option {
  id: number;
  value: string;
}

export interface SubQuestion {
  id: number;
  description: string;
  options: Option[];
}

export interface Question {
  id: number;
  number: string;
  question: string;
  description: string;
  options: Option[];
  sub_questions: SubQuestion[];
}
