const LightTheme = require("@getflip/swirl-tokens/dist/tailwind/light.json");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      ...LightTheme,
    },
  },
  plugins: [],
};
