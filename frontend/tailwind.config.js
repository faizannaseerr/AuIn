/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        merr: ["Merriweather", "serif"],
        source: ["Source Sans 3", "sans-serif"],
        mont: ["Montserrat", "sans-serif"]
      },
      backgroundImage: {
        'paint': "url('./images/blue.jpeg')",
      },
    },
  },
  plugins: [],
};
