/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        title: 'Inter_700Bold',
        body: 'Inter_400Regular',
        alt: 'Inter_500Medium',
      },
    },
  },
  plugins: [],
}
