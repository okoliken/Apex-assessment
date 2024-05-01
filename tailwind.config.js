/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        softShade: '5px 5px 50px rgba(26, 32, 44, 0.06)'
      },
      colors: {
        yellowDark: '#D4A701',
        yellowSoft: '#FEF7DC',
        purpleDark: '#8C62FF',
        purpleSoft: '#F4F0FF',
        greenDark: '#0CAF60',
        greenSoft: '#E7F7EF',
        redDark: '#FD6A6A',
        lightGray: '#EDF2F7',
        darkGrey: '#797B89',
        orangeDark: '#FE964A',
        orangeSoft: '#FFF0E6'
      }
    }
  },
  plugins: []
}

// box-shadow: 5px 5px 50px rgba(26, 32, 44, 0.06);
