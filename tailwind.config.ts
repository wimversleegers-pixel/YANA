import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        yana: {
          olive: '#8A7D2A',
          gold: '#CABA52',
          cream: '#F8F6EE',
          ink: '#2E2E2E',
          sage: '#E2E6D8'
        }
      }
    }
  },
  plugins: []
} satisfies Config;
