/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#203c35",
        "accent-gold": "#d4af37",
        "accent-gold-light": "#f3e5ab",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"],
        "serif": ["Cormorant Garamond", "serif"],
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
