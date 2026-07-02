/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        emerald: {
          DEFAULT: '#0b3d2e',
          deep: '#0b3d2e',
          soft: '#3b6b58',
          dark: '#072a20',
          night: '#04180f',
        },
        gold: {
          DEFAULT: '#c69b3a',
          deep: '#a97e1f',
          light: '#e6c877',
          soft: '#d9b455',
        },
        ink: {
          DEFAULT: '#2b352e',
          soft: '#5d6b62',
        },
        ivory: {
          DEFAULT: '#f7f2e9',
          light: '#fbf8f1',
        },
        cream: '#f8f1e5',
        bordo: '#7a1f2b',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Jost"', '"Inter"', 'sans-serif'],
        arab: ['"Amiri"', 'serif'],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        shimmer: 'shimmer 4s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 24s linear infinite',
      },
    },
  },
  plugins: [],
};
