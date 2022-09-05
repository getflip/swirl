const SwirlTailwindTheme = require("@getflip/swirl-tokens/dist/tailwind/swirl-tailwind.json");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      ...SwirlTailwindTheme,
    },
  },
  plugins: [],
};
