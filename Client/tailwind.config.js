/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#f3f4f6", // Light mode primary background
          dark: "#202124", // Dark mode primary background
        },
        secondary: {
          light: "#e5e7eb", // Light mode secondary elements
          dark: "#374151", // Dark mode secondary elements
        },
        accent: {
          light: "#3b82f6", // Accent color for light mode
          dark: "#2563eb", // Accent color for dark mode
        },
        text: {
          light: "#111827", // Text color in light mode
          dark: "#f9fafb", // Text color in dark mode
        },
      },
    },
  },
  plugins: [],
};
