import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#059669', // emerald-600
        accent: '#facc15', // yellow-400
      },
      fontFamily: {
        school: ['"Comic Neue"', 'cursive'],
      },
    },
  },
  plugins: [],
} satisfies Config;
