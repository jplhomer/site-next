const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: {
    content: ['./components/**/*.js', './pages/**/*.js'],
    options: {
      whitelist: ['dark-mode'],
    },
  },
  mode: 'jit',
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
    darkSelector: '.dark-mode',
  },
  plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/typography')],
};
