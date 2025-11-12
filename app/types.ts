export interface Deck {
  id: string;
  name: string;
  description?: string;
  defaultEasiness: number;
  cardCount?: number;
  createdAt: string;
}

export interface Card {
  id: string;
  deckId: string;
  easinessFactor: number;
  interval: number;
  repetitions: number;
  front: string;
  back: string;
  dueDate: string;
  createdAt: string;
  history: CardHistory[];
  tags: string[];
  suspended?: boolean;
  state: State;
  fails?: number;
}

export interface CardHistory {
  reviewedAt: string;
  rating: number;        
  intervalBefore: number;
  intervalAfter: number;    
  easinessBefore: number;
  easinessAfter: number;
  repetitionsBefore: number;
  repetitionsAfter: number;
  dueDateBefore: string;
  dueDateAfter: string;
}

export type State = 'new' | 'learning' | 'review' | 'relearning'