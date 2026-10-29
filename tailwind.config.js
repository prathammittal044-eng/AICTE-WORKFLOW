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
        gov: {
          navy: '#003087',
          navyDark: '#001C5C',
          navyLight: '#0B4DB5',
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
          info: '#2563EB',
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
