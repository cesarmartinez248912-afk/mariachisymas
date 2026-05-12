import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0b0b0d',
        surface: '#111114',
        surface2: '#17171c',
        surface3: '#1f1f26',
        line: 'rgba(212, 175, 55, 0.18)',
        gold: '#d4af37',
        gold2: '#f2ca50',
        wine: '#5b1212',
        text: '#f4efe7',
        muted: '#c9c1b5',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(212,175,55,.16), 0 20px 60px rgba(0,0,0,.35)',
      },
      backgroundImage: {
        'grain': 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.09) 1px, transparent 0)',
        'hero-overlay': 'linear-gradient(180deg, rgba(11,11,13,.35) 0%, rgba(11,11,13,.78) 50%, rgba(11,11,13,1) 100%)',
      },
      borderRadius: {
        'xl2': '1.25rem',
      },
      keyframes: {
        floatSlow: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        floatSlow: 'floatSlow 8s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
