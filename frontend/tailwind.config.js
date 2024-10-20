/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lightBackground: '#d8e3fa',
        lightText: '#ffffff',
        darkBackground:'#1b3562',
        darkText: '#000000',
        darkAccent: '#ff7f50',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

