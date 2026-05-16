
export interface TransformationResult {
  opening: string;
  expansion: string;
  irony: string;
  conclusion: string;
}

export interface SatiricalStoryResult {
  title: string;
  content: string;
  conclusion: string;
}

export interface BreakdownResult {
  opening: string;
  deconstruction: string;
  conclusion: string;
}

export interface OfficialResult {
  rephrasing: string;
  hiddenMeaning: string;
  satiricalConclusion: string;
}

export interface ManResult {
  monologue: string;
  conclusion: string;
}

export interface CitizenTestResult {
  complaint: string;
  complicity: string;
  reveal: string;
  absurdConclusion: string;
}

export interface QuestionResult {
  question: string;
}

export interface DialogueLine {
  speaker: string;
  text: string;
}

export interface DialogueResult {
  title: string;
  lines: DialogueLine[];
}

export type AppMode = 'news' | 'stories' | 'breakdown' | 'official' | 'man' | 'citizenTest' | 'uncomfortableQuestion' | 'socialDialogue';

export interface NewsStory {
  id: string;
  originalText: string;
  transformed: TransformationResult;
  timestamp: number;
  type: 'news';
}

export interface ShortStory {
  id: string;
  idea: string;
  transformed: SatiricalStoryResult;
  timestamp: number;
  type: 'story';
}

export interface BreakdownItem {
  id: string;
  situation: string;
  transformed: BreakdownResult;
  timestamp: number;
  type: 'breakdown';
}

export interface OfficialItem {
  id: string;
  officialText: string;
  transformed: OfficialResult;
  timestamp: number;
  type: 'official';
}

export interface ManItem {
  id: string;
  situation: string;
  transformed: ManResult;
  timestamp: number;
  type: 'man';
}

export interface CitizenTestItem {
  id: string;
  situation: string;
  transformed: CitizenTestResult;
  timestamp: number;
  type: 'citizenTest';
}

export interface QuestionItem {
  id: string;
  input: string;
  transformed: QuestionResult;
  timestamp: number;
  type: 'uncomfortableQuestion';
}

export interface SocialDialogueItem {
  id: string;
  topic: string;
  transformed: DialogueResult;
  timestamp: number;
  type: 'socialDialogue';
}

export type HistoryItem = 
  | NewsStory 
  | ShortStory 
  | BreakdownItem 
  | OfficialItem 
  | ManItem 
  | CitizenTestItem 
  | QuestionItem 
  | SocialDialogueItem;
