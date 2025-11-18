import type { Difficulty } from './questions';

const durationMap: Record<Difficulty, number> = {
  easy: 60,
  medium: 45,
  hard: 30,
};

export const getDurationForDifficulty = (difficulty: Difficulty) => durationMap[difficulty];

export const formatSeconds = (seconds: number) => `${seconds.toFixed(1)}s`;

export const calculateAverage = (values: number[]) => {
  if (!values.length) return '0.0s';
  const avg = values.reduce((sum, value) => sum + value, 0) / values.length;
  return formatSeconds(avg);
};

export const computeScorePercent = (score: number, total: number) => Math.round((score / Math.max(total, 1)) * 100);
