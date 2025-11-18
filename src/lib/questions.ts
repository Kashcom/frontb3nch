export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  category: string;
  difficulty: Difficulty;
  q: string;
  correct: string;
  options: string[];
}

const questionBank: Question[] = [
  { id: 'easy-1', category: 'math', difficulty: 'easy', q: 'What is 2 + 2?', correct: '4', options: ['3', '4', '5', '6'] },
  { id: 'easy-2', category: 'science', difficulty: 'easy', q: 'Which planet is known as the Red Planet?', correct: 'Mars', options: ['Venus', 'Mars', 'Jupiter', 'Mercury'] },
  { id: 'easy-3', category: 'english', difficulty: 'easy', q: 'Choose the plural of "child".', correct: 'Children', options: ['Childs', 'Childes', 'Children', 'Childen'] },
  { id: 'easy-4', category: 'history', difficulty: 'easy', q: 'Who was the first President of the United States?', correct: 'George Washington', options: ['Abraham Lincoln', 'Thomas Jefferson', 'George Washington', 'John Adams'] },
  { id: 'easy-5', category: 'coding', difficulty: 'easy', q: 'HTML stands for?', correct: 'HyperText Markup Language', options: ['Hyperlinks and Text Markup Language', 'HyperText Markup Language', 'Hyperlink Textual Mark Language', 'HighText Machine Language'] },
  { id: 'easy-6', category: 'art', difficulty: 'easy', q: 'Primary colors include red, blue, and?', correct: 'Yellow', options: ['Green', 'Purple', 'Yellow', 'Black'] },
  { id: 'easy-7', category: 'math', difficulty: 'easy', q: 'What is the value of pi rounded to two decimals?', correct: '3.14', options: ['2.41', '3.14', '3.41', '3.04'] },
  { id: 'easy-8', category: 'science', difficulty: 'easy', q: 'Water freezes at what temperature (°C)?', correct: '0', options: ['-10', '0', '10', '32'] },
  { id: 'easy-9', category: 'english', difficulty: 'easy', q: 'Which word is an adjective?', correct: 'Bright', options: ['Run', 'Bright', 'Softly', 'Tomorrow'] },
  { id: 'easy-10', category: 'history', difficulty: 'easy', q: 'The pyramids are located in?', correct: 'Egypt', options: ['Peru', 'Mexico', 'Egypt', 'China'] },
  { id: 'easy-11', category: 'coding', difficulty: 'easy', q: 'Which tag creates a hyperlink in HTML?', correct: '<a>', options: ['<div>', '<a>', '<p>', '<img>'] },
  { id: 'easy-12', category: 'art', difficulty: 'easy', q: 'Which artist painted the Mona Lisa?', correct: 'Leonardo da Vinci', options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet'] },
  { id: 'med-1', category: 'math', difficulty: 'medium', q: 'What is the derivative of x^2?', correct: '2x', options: ['x', '2x', 'x^2', '2'] },
  { id: 'med-2', category: 'science', difficulty: 'medium', q: 'What gas do plants absorb from the atmosphere?', correct: 'Carbon dioxide', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'] },
  { id: 'med-3', category: 'english', difficulty: 'medium', q: 'Identify the metaphor: "Time is a thief".', correct: 'Comparing time to a thief', options: ['A rhyme', 'Comparing time to a thief', 'A simile', 'An idiom'] },
  { id: 'med-4', category: 'history', difficulty: 'medium', q: 'In which year did World War II end?', correct: '1945', options: ['1939', '1945', '1950', '1963'] },
  { id: 'med-5', category: 'coding', difficulty: 'medium', q: 'Which array method creates a new array with elements that pass a test?', correct: 'filter', options: ['map', 'forEach', 'filter', 'reduce'] },
  { id: 'med-6', category: 'art', difficulty: 'medium', q: 'Cubism is most associated with which artist?', correct: 'Pablo Picasso', options: ['Frida Kahlo', 'Pablo Picasso', 'Salvador Dalí', 'Andy Warhol'] },
  { id: 'med-7', category: 'math', difficulty: 'medium', q: 'Solve for x: 3x - 9 = 0.', correct: '3', options: ['0', '1', '3', '9'] },
  { id: 'med-8', category: 'science', difficulty: 'medium', q: 'What is the chemical symbol for Sodium?', correct: 'Na', options: ['S', 'Na', 'So', 'No'] },
  { id: 'med-9', category: 'english', difficulty: 'medium', q: 'Choose the correct synonym for "elated".', correct: 'Joyful', options: ['Upset', 'Joyful', 'Calm', 'Confused'] },
  { id: 'med-10', category: 'history', difficulty: 'medium', q: 'The Renaissance began in which country?', correct: 'Italy', options: ['France', 'Italy', 'Spain', 'Germany'] },
  { id: 'med-11', category: 'coding', difficulty: 'medium', q: 'Which keyword declares a constant in JavaScript?', correct: 'const', options: ['var', 'let', 'const', 'static'] },
  { id: 'med-12', category: 'art', difficulty: 'medium', q: 'Which element of art refers to lightness or darkness?', correct: 'Value', options: ['Texture', 'Value', 'Space', 'Form'] },
  { id: 'hard-1', category: 'math', difficulty: 'hard', q: 'What is the integral of 1/x dx?', correct: 'ln|x| + C', options: ['x^2/2 + C', 'ln|x| + C', '1/(x^2) + C', 'e^x + C'] },
  { id: 'hard-2', category: 'science', difficulty: 'hard', q: 'Which scientist proposed the uncertainty principle?', correct: 'Werner Heisenberg', options: ['Albert Einstein', 'Niels Bohr', 'Werner Heisenberg', 'Max Planck'] },
  { id: 'hard-3', category: 'english', difficulty: 'hard', q: 'Identify the rhetorical device: "She sells seashells by the seashore."', correct: 'Alliteration', options: ['Hyperbole', 'Alliteration', 'Onomatopoeia', 'Oxymoron'] },
  { id: 'hard-4', category: 'history', difficulty: 'hard', q: 'Which treaty ended World War I?', correct: 'Treaty of Versailles', options: ['Treaty of Paris', 'Treaty of Ghent', 'Treaty of Versailles', 'Treaty of Lisbon'] },
  { id: 'hard-5', category: 'coding', difficulty: 'hard', q: 'What is the time complexity of binary search?', correct: 'O(log n)', options: ['O(n)', 'O(log n)', 'O(n^2)', 'O(1)'] },
  { id: 'hard-6', category: 'art', difficulty: 'hard', q: 'Which movement did Wassily Kandinsky help pioneer?', correct: 'Abstract art', options: ['Impressionism', 'Abstract art', 'Surrealism', 'Baroque'] },
  { id: 'hard-7', category: 'math', difficulty: 'hard', q: 'What is Euler’s formula relating complex exponentials?', correct: 'e^{iπ} + 1 = 0', options: ['a^2 + b^2 = c^2', 'e^{iπ} + 1 = 0', 'sin^2x + cos^2x = 1', 'F=ma'] },
  { id: 'hard-8', category: 'science', difficulty: 'hard', q: 'DNA replication is described as?', correct: 'Semi-conservative', options: ['Conservative', 'Semi-conservative', 'Liberal', 'Bidirectional only'] },
  { id: 'hard-9', category: 'english', difficulty: 'hard', q: 'What is a synecdoche?', correct: 'Part represents the whole', options: ['Exaggeration for effect', 'Part represents the whole', 'Contradictory terms', 'Sound-imitative word'] },
  { id: 'hard-10', category: 'history', difficulty: 'hard', q: 'Who wrote the "Two Treatises of Government"?', correct: 'John Locke', options: ['Jean-Jacques Rousseau', 'John Locke', 'Thomas Hobbes', 'Baron de Montesquieu'] },
  { id: 'hard-11', category: 'coding', difficulty: 'hard', q: 'Which pattern ensures a class has only one instance?', correct: 'Singleton', options: ['Observer', 'Factory', 'Singleton', 'Strategy'] },
  { id: 'hard-12', category: 'art', difficulty: 'hard', q: 'The term "chiaroscuro" primarily concerns?', correct: 'Contrast of light and dark', options: ['Perspective drawing', 'Contrast of light and dark', 'Color saturation', 'Texture layering'] }
];

export const getQuestionsByDifficulty = (difficulty: Difficulty): Question[] =>
  questionBank.filter((item) => item.difficulty === difficulty).slice(0, 12);

export const getQuestionsForQuiz = (quizId: string, difficulty: Difficulty): Question[] =>
  getQuestionsByDifficulty(difficulty).map((question, idx) => ({
    ...question,
    id: `${quizId}-${difficulty}-${idx}`,
  }));

export const availableCategories = ['math', 'science', 'english', 'history', 'coding', 'art'];
