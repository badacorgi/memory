import type { LevelConfig } from './types';

export const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵'];

export const LEVEL_CONFIG: LevelConfig[] = [
  { level: 1, pairs: 3, gridCols: 'grid-cols-3' },
  { level: 2, pairs: 4, gridCols: 'grid-cols-4' },
  { level: 3, pairs: 6, gridCols: 'grid-cols-4' },
  { level: 4, pairs: 8, gridCols: 'grid-cols-4' },
  { level: 5, pairs: 10, gridCols: 'grid-cols-5' },
  { level: 6, pairs: 12, gridCols: 'grid-cols-6' },
  { level: 7, pairs: 15, gridCols: 'grid-cols-6' },
];
