export type TopicCategory = 
  | 'all'
  | 'temel_kuvvet'
  | 'negatif_us'
  | 'carpma_bolme'
  | 'ussun_ussu'
  | 'ozel_kartlar';

export type CardTheme = 
  | 'indigo' 
  | 'emerald' 
  | 'amber' 
  | 'rose' 
  | 'purple' 
  | 'cyan';

export type DifficultyLevel = 'kolay' | 'orta' | 'zor';

export interface CardData {
  id: string;
  expression: string;
  expressionFormatted?: string; // Rich text / LaTeX style if needed
  expressionSubtext?: string;
  value: string; // The correct simplified value or decimal/fraction
  valueNumeric?: number;
  topic: TopicCategory;
  difficulty: DifficultyLevel;
  hint: string; // Given on wrong attempt
  solutionSteps: string[]; // Shown on back of card for consolidation
  wrongOptions: string[]; // Distractor choices for flashcard mode
  colorTheme: CardTheme;
  isCustom?: boolean;
  createdAt?: number;
}

export interface MatchTile {
  uid: string; // Unique tile instance id
  cardId: string;
  type: 'expression' | 'value';
  content: string;
  subtext?: string;
  matched: boolean;
  colorTheme: CardTheme;
}

export type ActiveTab = 'pekistirme' | 'eslesme' | 'atolye' | 'yazdir' | 'kurallar';

export interface UserStats {
  score: number;
  streak: number;
  bestStreak: number;
  totalAnswered: number;
  firstTryCorrect: number;
  hintsUsed: number;
  matchingGamesWon: number;
  customCardsCreated: number;
}
