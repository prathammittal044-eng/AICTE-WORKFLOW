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
        maroon: {
          50: '#FDF2F4',
          100: '#FCE7EB',
          200: '#F8C8D0',
          300: '#F299A6',
          400: '#E45C72',
          500: '#C22D47',
          600: '#9E1B31',
          700: '#881326',
          800: '#7A1526', // AICTE Sovereign Maroon
          900: '#580D1A',
          950: '#38060E'
        },
        gov: {
          maroon: '#7A1526',
          maroonDark: '#580D1A',
          maroonLight: '#9E1B31',
          navy: '#7A1526', // remapped to AICTE Maroon
          navyDark: '#580D1A',
          navyLight: '#9E1B31',
          saffron: '#FF9933',
          saffronDark: '#D97706',
          saffronLight: '#FFFBEB',
          white: '#FFFFFF',
          offWhite: '#F8FAFC',
          slate: '#64748B',
          border: '#CBD5E1',
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#DC2626',
          info: '#7A1526',
          auditGray: '#334155'
        }
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'serif'],
        sans: ['"Public Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
}
