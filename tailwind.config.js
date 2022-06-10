module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'sm' : 'repeat(2, minmax(0, max-content))',
        'md' : 'repeat(3, minmax(0, max-content))',
        'lg' : 'repeat(4, minmax(0, max-content))',
        'xl' : 'repeat(6, minmax(0, max-content))',
      },
      screens: {
        'xs': '450px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
};
