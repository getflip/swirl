const SwirlTailwindTheme = require("@getflip/swirl-tokens/dist/tailwind/light.json");
const safelist = require("./safelist.json");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    typography: {
      default: {
        css: {
          code: {
            "&::before": {
              content: '""',
            },
            "&::after": {
              content: '""',
            },
          },
        },
      },
    },
    extend: {
      ...SwirlTailwindTheme,
      gridTemplateColumns: {
        "fill-rows": "repeat(auto-fill, 10rem)",
        "icon-grid": "1fr 280px",
        "icon-grid-4xl": "repeat(6, 1fr)",
        "color-token-list": "24px 16rem 9rem 1fr",
        "typography-token-list": "48px repeat(3, 1fr)",
        "z-index-token-list": "96px repeat(5, 1fr)",
        "spacing-token-list": "64px repeat(5, 1fr)",
        "token-list": "minmax(24px, 96px) repeat(5, 1fr)",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
  ],
  safelist: [
    "text-[0.875.rem]",
    "text-[1.rem]",
    "text-[1.125.rem]",
    "text-[1.25.rem]",
    "text-[1.75.rem]",
    ...safelist.bgColors,
  ],
};
