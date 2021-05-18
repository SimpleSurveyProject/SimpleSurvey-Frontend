import { Answer } from './answer';

export interface Question {
  id: number;
  position: number;
  style: string;
  text: string;
  answers?: Answer[];
  surveyId?: number;
}

export interface QuestionWithSeries {
  id: number;
  position: number;
  style: string;
  text: string;
  answers?: Answer[];
  surveyId?: number;
  series: any[];
}

export interface QuestionWithAnswer {
  id: number;
  position: number;
  style: string;
  text: string;
  answer: string;
  answers?: Answer[];
  surveyId?: number;
}
