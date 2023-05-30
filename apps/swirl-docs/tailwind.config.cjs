const SwirlTailwindTheme = require("@getflip/swirl-tokens/dist/tailwind/light.json");
const safelist = require("./safelist.json");

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
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
        "documentation-layout": " 320px minmax(0, 1fr)",
        "fill-rows": "repeat(auto-fill, 10rem)",
        "icon-grid": "1fr 280px",
        "icon-grid-4xl": "repeat(6, 1fr)",
        "color-token-list": "24px 16rem 9rem 1fr",
        "typography-token-list": "48px repeat(3, 1fr)",
        "z-index-token-list": "96px repeat(5, 1fr)",
        "spacing-token-list": "64px repeat(5, 1fr)",
        "token-list": "minmax(24px, 96px) repeat(5, 1fr)",
        "api-spec": "repeat(2, minmax(0, 600px))",
        "codepreview-header": "3rem 70% 8rem",
      },
      borderWidth: {
        "border-1": "1px",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    keyframes: {
      rotateIn: {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(90deg)" },
      },
      rotateOut: {
        "0%": { transform: "rotate(90deg)" },
        "100%": { transform: "rotate(0deg)" },
      },
    },
    animation: {
      "rotate-in": "rotateIn 250ms ease-in-out",
      "rotate-out": "rotateOut 250ms ease-in-out",
    },
    transitionProperty: {
      transform: "transform",
    },
    scale: {
      0: "0",
      25: ".25",
      50: ".5",
      75: ".75",
      100: "1",
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
    ...safelist.zIndex,
    ...safelist.spacing,
    ...safelist.typography,
    ...safelist.border,
    ...safelist.bgColors,
  ],
};
