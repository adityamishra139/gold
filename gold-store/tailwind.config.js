/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#FFD700',
        lightgold: '#FAF3DD',
        richgold: '#D4AF37',
      },
    },
  },
  plugins: [],
}
