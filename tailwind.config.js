import { slate, indigo } from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#181A1D',
        'dark-secondary': '#131315',
        'light-primary': '#fffff',
        'light-secondary': slate[100],
        'slate-light': slate[50],
        'slate-medium': slate[500],
        'slate-dark': slate[700],
        accent: indigo[600],
      },
      keyframes: {
        shake: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(2rem)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      animation: {
        shake: 'shake 2s linear infinite',
        'fade-in-up': 'fadeInUp 1s ease-in-out .5s forwards',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@headlessui/tailwindcss'),
  ],
  darkMode: 'class',
};
