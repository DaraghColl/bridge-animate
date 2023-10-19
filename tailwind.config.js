/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#131315',
        'dark-secondary': '#181A1D',
      },
    },
  },
  plugins: [],
};
