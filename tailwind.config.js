const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./components/**/*.js', './pages/**/*.js'],
  mode: 'jit',
  darkMode: 'class',
  theme: {
    typography: (theme) => ({
      default: {
        css: {
          color: theme('colors.gray.900'),

          a: {
            color: theme('colors.blue.500'),
            '&:hover': {
              color: theme('colors.blue.700'),
            },
          },
        },
      },

      dark: {
        css: {
          color: theme('colors.gray.100'),

          a: {
            color: theme('colors.blue.100'),
            '&:hover': {
              color: theme('colors.blue.100'),
            },
          },
        },
      },
    }),
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/typography')],
};
