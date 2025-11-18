'use client';

import { Suspense, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { getQuestionsByDifficulty, type Difficulty } from '@/lib/questions';
import { useStore } from '@/lib/store';

const options: { label: string; level: Difficulty; description: string; time: string }[] = [
  { label: 'Easy', level: 'easy', description: 'Calm pacing, generous hints.', time: '60s' },
  { label: 'Medium', level: 'medium', description: 'Balanced tempo, tougher distractors.', time: '45s' },
  { label: 'Hard', level: 'hard', description: 'Lightning fast, tricky traps.', time: '30s' },
];

const DifficultyContent = () => {
  const router = useRouter();
  const params = useSearchParams();
  const quizId = params.get('quiz') ?? '';
  const actions = useStore((state) => state.actions);

  const subtitle = useMemo(() => (quizId ? `Quiz: ${quizId.replace('-', ' ')}` : 'Pick a deck first'), [quizId]);

  const handleSelect = (level: Difficulty) => {
    if (!quizId) {
      router.push('/play/library');
      return;
    }
    const qs = getQuestionsByDifficulty(level);
    actions.setQuiz(quizId, level, qs);
    router.push(`/play/quiz/${quizId}`);
  };

  return (
    <motion.section
      className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-16"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="sr-only">Select difficulty level</h1>
      <div className="mx-auto max-w-5xl space-y-10 text-center">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary sm:text-sm">Difficulty</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">How spicy should the quiz feel?</p>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">{subtitle}</p>
        </header>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {options.map((option) => (
            <button
              key={option.level}
              type="button"
              onClick={() => handleSelect(option.level)}
              className="flex flex-col rounded-3xl border border-slate-100 bg-white p-5 text-left shadow-lg transition hover:-translate-y-1 hover:border-primary sm:p-6"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">{option.time}</p>
              <p className="mt-3 text-2xl font-bold text-slate-900 sm:mt-4 sm:text-3xl">{option.label}</p>
              <p className="mt-2 flex-1 text-slate-600 sm:mt-3">{option.description}</p>
              <span className="mt-4 text-sm font-semibold text-primary sm:mt-6">Select →</span>
            </button>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const DifficultyPage = () => (
  <Suspense
    fallback={
      <section className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-5xl animate-pulse space-y-4">
          <div className="h-6 w-32 rounded-full bg-slate-200" />
          <div className="h-10 w-2/3 rounded-full bg-slate-200" />
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {[...Array(3)].map((_, idx) => (
              <div key={`skeleton-${idx}`} className="h-32 rounded-3xl bg-white shadow-inner sm:h-40" />
            ))}
          </div>
        </div>
      </section>
    }
  >
    <DifficultyContent />
  </Suspense>
);

export default DifficultyPage;
