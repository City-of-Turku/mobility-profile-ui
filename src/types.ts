export interface TextBasicProps {
  text: string;
}

export interface SettingsState {
  localeSelection: string;
}

export interface QuestionListProps {
  itemsPerPage: number;
}

export interface QuestionListItem {
  id: string;
  question: string;
  description: string;
}

export interface PaginationProps {
  items: QuestionListItem[];
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (e: number) => void;
}
