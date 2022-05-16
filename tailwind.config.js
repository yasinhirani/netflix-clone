module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'sm' : 'repeat(1, minmax(0, max-content))',
        'md' : 'repeat(2, minmax(0, max-content))',
        'lg' : 'repeat(3, minmax(0, max-content))',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
};
