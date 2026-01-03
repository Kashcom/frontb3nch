import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7CB342', // Green (Functional)
        accent: '#ffffff', // White (Monochrome UI Accent)
        purple: '#9B59B6', // (Functional)
        dark: {
          bg: '#0a0a0a',
          card: '#1a1a1a',
          border: '#2a2a2a',
        },
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #333333 0%, #1a1a1a 100%)', // Replaced with monochrome for now
        'gradient-green': 'linear-gradient(135deg, #7CB342 0%, #689F38 100%)',
        'gradient-purple': 'linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
