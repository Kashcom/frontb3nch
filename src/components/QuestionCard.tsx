'use client';

import { motion } from 'framer-motion';
import OptionCard, { OptionState } from './OptionCard';
import type { Question } from '@/lib/questions';

interface QuestionCardProps {
  item: Question;
  index: number;
  total: number;
  selected: string | null;
  revealCorrect: boolean;
  onSelect: (choice: string) => void;
}

const QuestionCard = ({ item, index, total, selected, revealCorrect, onSelect }: QuestionCardProps) => (
  <motion.div
    className="rounded-3xl bg-white p-5 shadow-xl ring-1 ring-slate-100 sm:p-8"
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
  >
    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
      Question {index + 1} of {total}
    </p>
    <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">{item.q}</h2>
    <p className="mt-2 text-xs uppercase text-slate-500 sm:text-sm">{item.category}</p>

    <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
      {item.options.map((option) => {
        let state: OptionState = 'idle';
        if (selected === option) {
          state = option === item.correct ? 'correct' : 'wrong';
        } else if (revealCorrect && option === item.correct) {
          state = 'highlight';
        }
        return <OptionCard key={option} text={option} state={state} disabled={Boolean(selected)} onSelect={() => onSelect(option)} />;
      })}
    </div>
  </motion.div>
);

export default QuestionCard;
