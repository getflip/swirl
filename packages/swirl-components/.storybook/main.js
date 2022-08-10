module.exports = {
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: {
        actions: false,
      },
    },
    "@pxtrn/storybook-addon-docs-stencil",
    "@storybook/addon-a11y",
  ],
  core: {
    builder: "@storybook/builder-vite",
  },
  framework: "@storybook/html",
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
};
