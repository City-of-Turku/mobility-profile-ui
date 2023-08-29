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

export interface OptionsItem {
  id: string;
  value: string;
}

export interface SubQuestioItem {
  id: string;
  description: string;
  options: OptionsItem[];
}

export interface QuestionListItem {
  id: string;
  question: string;
  description: string;
  options: OptionsItem[];
  sub_questions: SubQuestioItem[];
}

export interface PaginationProps {
  items: QuestionListItem[];
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (e: number) => void;
}
