export interface IPerformanceData {
  performance: IPerformance[];
}

export interface IPerformance {
  exam: number;
  exercises: number;
  subject: string;
  scoreTotal: number;
  progress: number;
  examDone: boolean;
}
