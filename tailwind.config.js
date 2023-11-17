import { slate, indigo } from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#131315',
        'dark-secondary': '#181A1D',
        'light-primary': '#fffff',
        'light-secondary': slate[100],
        'slate-light': slate[50],
        'slate-medium': slate[500],
        'slate-dark': slate[700],
        accent: indigo[600],
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@headlessui/tailwindcss'),
  ],
  darkMode: 'class',
};
