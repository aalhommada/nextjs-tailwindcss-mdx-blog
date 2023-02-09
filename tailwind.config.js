/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [{
    pattern: /hljs+/,
  }],
  theme: {
    fontWeight: {
      "veryLarg": "900",
      "medLarg": "700"
    },
    hljs: {
      theme: 'stackoverflow-dark',
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-highlightjs'),
  ],
}
