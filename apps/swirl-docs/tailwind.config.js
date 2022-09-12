const SwirlTailwindTheme = require("@getflip/swirl-tokens/dist/tailwind/swirl-tailwind.json");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      ...SwirlTailwindTheme,
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
