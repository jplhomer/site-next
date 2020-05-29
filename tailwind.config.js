const defaultTheme = require('tailwindcss/defaultTheme');
const defaultConfig = require('tailwindcss/defaultConfig');

module.exports = {
  purge: {
    content: ['./components/**/*.js', './pages/**/*.js'],
    options: {
      whitelist: ['dark-mode'],
    },
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
    darkSelector: '.dark-mode',
  },
  variants: {
    backgroundColor: [
      ...defaultConfig.variants.backgroundColor,
      'dark',
      'dark-hover',
      'dark-group-hover',
      'dark-even',
      'dark-odd',
    ],
    borderColor: [...defaultConfig.variants.borderColor, 'dark', 'dark-focus', 'dark-focus-within'],
    textColor: [...defaultConfig.variants.textColor, 'dark', 'dark-hover', 'dark-active', 'dark-placeholder'],
  },
  plugins: [require('@tailwindcss/ui'), require('tailwindcss-dark-mode')()],
};
