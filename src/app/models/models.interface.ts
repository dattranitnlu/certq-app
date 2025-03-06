export interface Provider {
  provider: string;
  exams: string[];
}

export interface Question {
  title: string | any;
  question: string | any;
  images: string | any;
  options: string[] | any[];
  correct: string | string[];
  questionNumber: number | any;
  text: string | any;
  statements?: Statement[] | any;
}

export interface Statement {
  text: string;
  userAnswer?: string;
  isCorrect?: boolean;
  correct?: string;
}
