'use client';

import { create } from 'zustand';
import type { Question, Difficulty } from './questions';

export interface Store {
  quizId: string;
  difficulty: Difficulty;
  questions: Question[];
  index: number;
  score: number;
  wrongQs: { q: string; correct: string }[];
  responseTimes: number[];
  startTime: number;
  actions: {
    setQuiz: (id: string, diff: Store['difficulty'], qs: Question[]) => void;
    answer: (choice: string, correct: string) => void;
    nextQuestion: () => void;
  };
}

export const useStore = create<Store>((set, get) => ({
  quizId: '',
  difficulty: 'easy',
  questions: [],
  index: 0,
  score: 0,
  wrongQs: [],
  responseTimes: [],
  startTime: Date.now(),
  actions: {
    setQuiz: (id, diff, qs) =>
      set(() => ({
        quizId: id,
        difficulty: diff,
        questions: qs,
        index: 0,
        score: 0,
        wrongQs: [],
        responseTimes: [],
        startTime: Date.now(),
      })),
    answer: (choice, correct) => {
      const { questions, index, startTime } = get();
      const elapsedSeconds = startTime ? (Date.now() - startTime) / 1000 : 0;
      set((state) => ({
        score: choice === correct ? state.score + 1 : state.score,
        wrongQs:
          choice === correct
            ? state.wrongQs
            : [...state.wrongQs, { q: questions[index]?.q ?? 'Unknown question', correct }],
        responseTimes: [...state.responseTimes, elapsedSeconds],
      }));
    },
    nextQuestion: () =>
      set((state) => ({
        index: state.index + 1,
        startTime: Date.now(),
      })),
  },
}));
