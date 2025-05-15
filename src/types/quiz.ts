export interface Country {
  code: string;
  name: string;
  format: string;
};

export type QuestionOption = {
  label: string;
  value: string;
};

export type ImageOption = QuestionOption & {
  imageUrl: string;
  description?: string;
};

export type Option = QuestionOption;

export type Question = {
  id: number;
  type: 'single' | 'multiple' | 'contact' | 'rating' | 'text' | 'date' | 'range' | 'image-choice' | 'matrix' | 'priority' | 'file-upload';
  question: string;
  description: string;
  options: QuestionOption[] | ImageOption[] | string[];
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  rows?: string[];
  columns?: string[];
  maxFiles?: number;
  acceptedFileTypes?: string[];
  tip?: string;
};

export type Answers = {
  [key: number]: string | string[] | number | File[] | { [key: string]: string };
  messenger?: string;
  phone?: string;
  countryCode?: string;
  telegramUsername?: string;
};