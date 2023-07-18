export interface IQuestion {
  subject: string;
  text: string;
  options: string[];
  correctAnswer: string;
  selectedAnswer: string | null;
}
