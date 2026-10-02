/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#e9eef7',
          100: '#c7d5eb',
          500: '#20345D',
          600: '#1a2a4b',
          700: '#14213c',
          800: '#0e172a',
          900: '#070b16',
        },
        brandBlue: {
          DEFAULT: '#2F80D9',
          hover: '#246ab8',
          light: '#eaf2fc',
        },
        brandOrange: {
          DEFAULT: '#F0522C',
          hover: '#d4411d',
          light: '#fdeee9',
        },
        brandYellow: {
          DEFAULT: '#F2A72E',
          hover: '#da921e',
          light: '#fef6e9',
        },
        bgLight: '#F7F9FC',
        textMain: '#263A5F',
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(32, 52, 93, 0.06), 0 2px 6px -1px rgba(32, 52, 93, 0.04)',
        cardHover: '0 12px 30px -4px rgba(32, 52, 93, 0.12), 0 4px 12px -2px rgba(32, 52, 93, 0.06)',
      }
    },
  },
  plugins: [],
}
