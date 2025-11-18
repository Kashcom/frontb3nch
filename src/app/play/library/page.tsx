'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { allDecks } from '@/lib/questions';

const LibraryPage = () => {
  const router = useRouter();

  return (
    <motion.section
      className="bg-slate-50 px-4 py-14 sm:px-6 sm:py-16"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="sr-only">Choose a quiz from the library</h1>
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600 sm:text-sm">Library</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Pick a pre-made deck</p>
          <p className="mt-2 text-base text-slate-600 sm:text-lg">Pick a subject, then choose your game mode.</p>
        </header>
        <div className="quiz-grid">
          {allDecks.map((deck) => (
            <button
              key={deck.id}
              type="button"
              onClick={() => router.push(`/play/difficulty?quiz=${deck.id}`)}
              className="glow-card flex h-full flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-primary"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Deck</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{deck.title}</p>
                <p className="mt-3 text-sm text-slate-600">{deck.description}</p>
                <div className={`mt-5 grid gap-3 rounded-2xl bg-gradient-to-br ${deck.accent} p-4 text-left`}>
                  <div className="rounded-xl bg-white/70 p-3 text-sm font-semibold text-slate-800 shadow-sm">
                    Q: {deck.previewQA.question}
                  </div>
                  <div className="rounded-xl bg-white/70 p-3 text-sm text-emerald-700 shadow-sm">
                    A: {deck.previewQA.answer}
                  </div>
                </div>
              </div>
              <span className="mt-6 inline-flex items-center text-sm font-semibold text-primary">
                Choose deck →
              </span>
            </button>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default LibraryPage;
