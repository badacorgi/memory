export interface Card {
  id: number; // Identifier for the pair, e.g., 1 for both '🐶' cards
  uniqueId: number; // Unique identifier for each card instance
  content: string; // The emoji or symbol on the card
  isFlipped: boolean;
  isMatched: boolean;
}

export interface LevelConfig {
  level: number;
  pairs: number;
  gridCols: string;
}
