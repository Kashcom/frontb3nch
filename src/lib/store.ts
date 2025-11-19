'use client';

import { create } from 'zustand';
import type { Question, GameMode } from './questions';

export interface PdfQuizSection {
  title: string;
  insight: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface PdfQuizAnalysis {
  summary: string;
  highlights: string[];
  sections: PdfQuizSection[];
  recommendations: string[];
  context: string;
  questionSet: Question[];
  sourceName: string;
  generatedAt: number;
}

export interface UploadSource {
  name: string;
  size: number;
  dataUrl: string;
  lastModified: number;
}

export interface Store {
  quizId: string;
  deckId: string;
  mode: GameMode | null;
  questions: Question[];
  index: number;
  score: number;
  wrongQs: { q: string; correct: string; user?: string }[];
  responseTimes: number[];
  startTime: number;
  upload?: UploadSource;
  analysis?: PdfQuizAnalysis;
  actions: {
    setQuiz: (config: { id: string; mode: GameMode; questions: Question[] }) => void;
    answer: (choice: string, correct: string) => void;
    nextQuestion: () => void;
    setUploadSource: (payload: UploadSource) => void;
    setAnalysis: (payload?: PdfQuizAnalysis) => void;
  };
}

export const useStore = create<Store>((set, get) => ({
  quizId: '',
  deckId: '',
  mode: null,
  questions: [],
  index: 0,
  score: 0,
  wrongQs: [],
  responseTimes: [],
  startTime: Date.now(),
  upload: undefined,
  analysis: undefined,
  actions: {
    setQuiz: ({ id, mode, questions }) =>
      set(() => ({
        quizId: id,
        deckId: id,
        mode,
        questions,
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
            : [...state.wrongQs, { q: questions[index]?.q ?? 'Unknown question', correct, user: choice }],
        responseTimes: [...state.responseTimes, elapsedSeconds],
      }));
    },
    nextQuestion: () =>
      set((state) => ({
        index: state.index + 1,
        startTime: Date.now(),
      })),
    setUploadSource: (payload) =>
      set(() => ({
        upload: payload,
        analysis: undefined,
      })),
    setAnalysis: (payload) =>
      set(() => ({
        analysis: payload,
      })),
  },
}));
