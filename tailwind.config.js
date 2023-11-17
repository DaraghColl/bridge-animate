/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#131315',
        'dark-secondary': '#181A1D',
        'light-primary': '#fffff',
        'light-secondary': '#f1f5f9',
        'slate-medium': '#64748b',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@headlessui/tailwindcss'),
  ],
  darkMode: 'class',
};
