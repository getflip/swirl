const { viteFinalFactory } = require("storybook-design-token/dist/preset");

module.exports = {
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: {
        actions: false,
        backgrounds: false,
        outline: false,
      },
    },
    "@pxtrn/storybook-addon-docs-stencil",
    "@storybook/addon-a11y",
    "storybook-addon-themes",
    "storybook-design-token",
  ],
  core: {
    builder: "@storybook/builder-vite",
  },
  framework: "@storybook/html",
  staticDirs: ["../src/assets"],
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  viteFinal: viteFinalFactory({
    designTokenGlob:
      "../../node_modules/@getflip/swirl-tokens/dist/css/styles.custom-properties.css",
  }),
};
