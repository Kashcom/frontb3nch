'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const decks = [
  { id: 'math-master', title: 'Math Mastery', blurb: 'Fractions, ratios, and graphs' },
  { id: 'science-lab', title: 'Science Lab', blurb: 'Plants, space, chemistry basics' },
  { id: 'english-boost', title: 'English Boost', blurb: 'Grammar, vocab, figurative language' },
  { id: 'history-quest', title: 'History Quest', blurb: 'World events & trailblazers' },
  { id: 'geo-globe', title: 'Geo Globe', blurb: 'Maps, climate, landforms' },
  { id: 'code-camp', title: 'Code Camp', blurb: 'Logic, loops, and UIs' },
];

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
          <p className="mt-2 text-base text-slate-600 sm:text-lg">
            Subjects curated by teachers. Tap one to jump into difficulty selection.
          </p>
        </header>
        <div className="quiz-grid">
          {decks.map((deck) => (
            <button
              key={deck.id}
              type="button"
              onClick={() => router.push(`/play/difficulty?quiz=${deck.id}`)}
              className="glow-card flex h-full flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-primary"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Deck</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{deck.title}</p>
                <p className="mt-3 text-sm text-slate-600">{deck.blurb}</p>
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
