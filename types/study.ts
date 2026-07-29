export type Source = {
  label: string;
  url: string;
};

export type StudyModule = {
  id: string;
  title: string;
  focus: string;
  facts: string[];
  sources: Source[];
};

export type Question = {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  moduleId: StudyModule["id"];
};

export type ScenarioStep = {
  title: string;
  evidence: string;
  takeaway: string;
};

export type StudyProgress = Record<string, number>;
