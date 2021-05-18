import { Answer } from './answer';

export interface Question {
  id: number;
  position: number;
  style: string;
  text: string;
  answers?: Answer[];
  surveyId?: number;
}
