'use client';

import { motion } from 'framer-motion';

export type OptionState = 'idle' | 'correct' | 'wrong' | 'highlight';

interface OptionCardProps {
  text: string;
  state?: OptionState;
  disabled?: boolean;
  onSelect?: () => void;
}

const styles: Record<OptionState, string> = {
  idle: 'border-slate-200 bg-white text-slate-800 hover:border-emerald-200 hover:bg-emerald-50/40',
  correct: 'animate-burst border-emerald-600 bg-emerald-50 text-emerald-700 shadow-[0_10px_30px_rgba(16,185,129,0.25)]',
  wrong: 'animate-shake border-rose-500 bg-rose-50 text-rose-500 line-through',
  highlight: 'border-emerald-500 bg-white text-slate-900 ring-2 ring-emerald-400',
};

const OptionCard = ({ text, state = 'idle', disabled, onSelect }: OptionCardProps) => {
  const states = [styles[state]];
  if (disabled) {
    states.push('cursor-not-allowed opacity-80');
  }

  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={`w-full rounded-2xl border px-4 py-4 text-left text-base font-semibold shadow-sm transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent sm:px-5 sm:text-lg ${states.join(
        ' '
      )}`}
    >
      {text}
    </motion.button>
  );
};

export default OptionCard;
