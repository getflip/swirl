module.exports = {
  addons: [
    "@storybook/addon-essentials",
    "@pxtrn/storybook-addon-docs-stencil",
  ],
  core: {
    builder: "webpack5",
  },
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  framework: "@storybook/html",
};
