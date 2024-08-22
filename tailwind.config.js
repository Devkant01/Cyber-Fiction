/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "index.html",
    "./src/**/*.{html,js}" // All HTML and JS files in the src folder
  ],
  theme: {
    fontFamily: {
      Urbanist: ['Urbanist', 'Noto Sans KR', 'sans - serif'],
    },
    extend: {},
  },
  plugins: [],
}