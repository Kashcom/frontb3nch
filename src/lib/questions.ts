export type Difficulty = 'medium' | 'hard';
export type GameMode = 'normal' | 'timed';

export interface Question {
  id: string;
  category: 'math' | 'science' | 'coding';
  difficulty: Difficulty;
  q: string;
  correct: string;
  options: string[];
}

export interface QuizDeck {
  id: string;
  title: string;
  description: string;
  category: Question['category'];
  previewQA: { question: string; answer: string };
  accent: string;
}

const questionBank: Question[] = [
  { id: 'math-med-derivative', category: 'math', difficulty: 'medium', q: 'What is the derivative of 4x^3?', correct: '12x^2', options: ['4x^2', '8x', '12x^2', '16x^3'] },
  { id: 'math-med-determinant', category: 'math', difficulty: 'medium', q: 'What is the determinant of [[2,1],[3,4]]?', correct: '5', options: ['-5', '5', '8', '11'] },
  { id: 'math-med-prob', category: 'math', difficulty: 'medium', q: 'A fair die is rolled twice. P(sum = 8)?', correct: '5/36', options: ['1/6', '5/36', '1/9', '1/12'] },
  { id: 'math-hard-euler', category: 'math', difficulty: 'hard', q: 'Euler’s identity equals?', correct: 'e^{iπ} + 1 = 0', options: ['e^{iπ} + 1 = 0', 'e^{π} - 1 = 0', 'πe = 0', 'iπ + e = 0'] },
  { id: 'math-hard-eigen', category: 'math', difficulty: 'hard', q: 'Eigenvalues of [[5,2],[2,5]]?', correct: '7 and 3', options: ['5 and 5', '9 and 1', '7 and 3', '6 and 4'] },
  { id: 'math-hard-series', category: 'math', difficulty: 'hard', q: 'Does Σ 1/n^2 converge?', correct: 'Yes, to π^2/6', options: ['No', 'Yes, to π^2/6', 'Yes, to π^2/4', 'Yes, to 2'] },
  { id: 'science-med-redox', category: 'science', difficulty: 'medium', q: 'What is reduced in water electrolysis?', correct: 'Hydrogen ions', options: ['Oxygen', 'Hydrogen ions', 'Electrons', 'Sodium'] },
  { id: 'science-med-genes', category: 'science', difficulty: 'medium', q: 'DNA base pairing rule?', correct: 'A-T & C-G', options: ['A-C & T-G', 'A-T & C-G', 'A-G & T-C', 'A-U & C-G'] },
  { id: 'science-med-plates', category: 'science', difficulty: 'medium', q: 'Boundary causing subduction?', correct: 'Convergent plates', options: ['Divergent plates', 'Transform plates', 'Convergent plates', 'Static plates'] },
  { id: 'science-hard-heisenberg', category: 'science', difficulty: 'hard', q: 'Uncertainty principle links?', correct: 'Position & momentum', options: ['Mass & energy', 'Charge & spin', 'Position & momentum', 'Heat & work'] },
  { id: 'science-hard-entropy', category: 'science', difficulty: 'hard', q: 'Entropy of an isolated system?', correct: 'Never decreases', options: ['Never decreases', 'Always decreases', 'Stays constant', 'Becomes zero'] },
  { id: 'science-hard-quarks', category: 'science', difficulty: 'hard', q: 'Protons are made of?', correct: 'Two up, one down quark', options: ['One up, two down', 'Two up, one down quark', 'Three strange', 'Up, charm, bottom'] },
  { id: 'coding-med-closure', category: 'coding', difficulty: 'medium', q: 'Closures in JS capture?', correct: 'Their lexical scope', options: ['Global scope only', 'Their lexical scope', 'DOM nodes automatically', 'Only async values'] },
  { id: 'coding-med-bigsO', category: 'coding', difficulty: 'medium', q: 'Complexity of merge sort?', correct: 'O(n log n)', options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'] },
  { id: 'coding-med-rest', category: 'coding', difficulty: 'medium', q: 'HTTP verb for idempotent update?', correct: 'PUT', options: ['POST', 'PUT', 'PATCH', 'DELETE'] },
  { id: 'coding-hard-memo', category: 'coding', difficulty: 'hard', q: 'Memoization optimizes?', correct: 'Pure functions with repeated inputs', options: ['Mutating functions', 'Pure functions with repeated inputs', 'Random generators', 'DOM events'] },
  { id: 'coding-hard-deadlock', category: 'coding', difficulty: 'hard', q: 'Deadlock requires?', correct: 'Mutual exclusion & hold-and-wait', options: ['Preemption', 'Mutual exclusion & hold-and-wait', 'Single resource', 'No resource ordering'] },
  { id: 'coding-hard-acid', category: 'coding', difficulty: 'hard', q: 'ACID isolation ensures?', correct: 'Concurrent txns act sequential', options: ['Faster IO', 'Concurrent txns act sequential', 'Disk compression', 'Key sharding'] },
];

const quizDecks: QuizDeck[] = [
  {
    id: 'math-forge',
    title: 'Math Forge',
    description: 'Proof-driven drills focused on calculus, probability, and linear algebra.',
    category: 'math',
    previewQA: { question: 'Eigenvalues of [[5,2],[2,5]]?', answer: '7 and 3' },
    accent: 'from-amber-100 to-amber-200',
  },
  {
    id: 'science-lab',
    title: 'Science Lab',
    description: 'Physics and bio bursts covering entropy, quarks, and biotech basics.',
    category: 'science',
    previewQA: { question: 'Entropy of an isolated system?', answer: 'It never decreases.' },
    accent: 'from-sky-100 to-sky-200',
  },
  {
    id: 'dev-sprint',
    title: 'Dev Sprint',
    description: 'Systems and JS theory with algorithms, REST, and architecture.',
    category: 'coding',
    previewQA: { question: 'What does memoization optimize?', answer: 'Pure functions with repeated inputs.' },
    accent: 'from-emerald-100 to-emerald-200',
  },
];

const deckMap = quizDecks.reduce<Record<string, QuizDeck>>((acc, deck) => {
  acc[deck.id] = deck;
  return acc;
}, {});

const mediumHardPool = questionBank;

const shuffle = <T,>(input: T[]): T[] => {
  const list = [...input];
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
};

export const buildQuizQuestions = (deckId: string, count = 10): Question[] => {
  const deck = deckMap[deckId];
  const categoryPool = deck ? mediumHardPool.filter((item) => item.category === deck.category) : mediumHardPool;
  const pool = categoryPool.length >= count ? categoryPool : mediumHardPool;
  return shuffle(pool)
    .slice(0, count)
    .map((question, idx) => ({
      ...question,
      id: `${deckId}-${question.id}-${idx}`,
    }));
};

export const allDecks = quizDecks;
export const findDeck = (deckId: string) => deckMap[deckId];
