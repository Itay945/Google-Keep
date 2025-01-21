/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFFFFF', // Light mode primary background
          dark: '#202124', // Dark mode primary background
        },
        secondary: {
          light: '#F1F3F4', // Light mode secondary elements
          dark: '#525355', // Dark mode secondary elements
        },
        accent: {
          light: '#3b82f6', // Accent color for light mode
          dark: '#2563eb', // Accent color for dark mode
        },
        text: {
          light: '#111827', // Text color in light mode
          dark: '#f9fafb', // Text color in dark mode
        },
        search: {
          light: '#F1F3F4', //searchbar
          dark: '#525355', //searchbar
        },
      },
    },
  },
  plugins: [],
};
