export interface FaqItem {
  question: string;
  answers: string;
}

export interface Plan {
  name: string;
  description: string;
  amount: number;
  features: string[];
}

export interface Step {
  step: number;
  name: string;
  description: string;
}

export interface IPerformance {
  value: string;
  description?: string;
  desctiption?: string;
}

export type IPerfomance = IPerformance;
