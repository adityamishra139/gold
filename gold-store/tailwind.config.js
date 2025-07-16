/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
  gold: {
    50: '#fffdf6',
    100: '#fef7e0',
    200: '#fbeeb3',
    300: '#f8e37e',
    400: '#f6d54f',
    500: '#efc434', // your main gold
    600: '#d2a52d',
    700: '#a57823',
    800: '#7c571b',
    900: '#5e4013',
  },
}

    },
  },
  plugins: [],
}
