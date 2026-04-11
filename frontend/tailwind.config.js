/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.ts",
    "./types.ts",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        claude: {
          bg: '#FAF9F7',
          'bg-dark': '#1C1917',
          card: '#FFFFFF',
          'card-dark': '#292524',
          accent: '#D97706',
          'accent-light': '#F59E0B',
          'accent-dark': '#B45309',
          warm: '#F5F0EB',
          'warm-dark': '#292524',
        }
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
