'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { calculateAverage, computeScorePercent } from '@/lib/utils';

const Result3D = dynamic(() => import('@/components/Result3D'), {
  ssr: false,
  loading: () => <div className="h-72 w-full animate-pulse rounded-3xl bg-slate-800" />,
});

const ResultPage = () => {
  const router = useRouter();
  const { quizId, score, questions, wrongQs, responseTimes } = useStore((state) => ({
    quizId: state.quizId,
    score: state.score,
    questions: state.questions,
    wrongQs: state.wrongQs,
    responseTimes: state.responseTimes,
  }));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!questions.length) {
      router.replace('/play/import');
    }
  }, [questions.length, router]);

  const percent = computeScorePercent(score, questions.length);
  const average = calculateAverage(responseTimes);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/play/import`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <motion.section
      className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-16"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="sr-only">Quiz results summary</h1>
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-100 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary sm:text-sm">Scoreboard</p>
            <p className="text-3xl font-bold text-slate-900 sm:text-4xl">{percent}%</p>
            <p className="text-sm text-slate-600 sm:text-base">
              You solved {score} / {questions.length} questions.
            </p>
            <p className="text-sm text-slate-500">Average response time: {average}</p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:pt-4">
              <button
                type="button"
                onClick={() => router.push('/play/import')}
                className="rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-white shadow-lg sm:flex-1"
              >
                Play again
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="rounded-full border border-slate-200 px-6 py-3 text-center text-sm font-semibold text-slate-800 sm:flex-1"
              >
                {copied ? 'Link copied!' : 'Share'}
              </button>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Deck: {quizId || 'custom upload'}</p>
          </div>
          <Result3D score={percent} />
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-100 sm:p-8">
          <p className="text-lg font-semibold text-slate-900 sm:text-xl">Review your stumbles</p>
          {wrongQs.length === 0 ? (
            <p className="mt-4 text-sm text-slate-600 sm:text-base">Flawless victory! No wrong answers recorded.</p>
          ) : (
            <ul className="mt-4 space-y-4">
              {wrongQs.map((item, idx) => (
                <li key={`${item.q}-${idx}`} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <p className="font-semibold text-slate-800">{item.q}</p>
                  <p className="text-sm text-slate-500">
                    Correct answer: <span className="font-semibold text-primary">{item.correct}</span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default ResultPage;
