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
    "@storybook/addon-mdx-gfm",
  ],
  core: { disableTelemetry: true },
  docs: {
    autodocs: "tag",
  },
  framework: {
    name: "@storybook/html-vite",
    options: {},
  },
  staticDirs: ["../src/assets", "../public"],
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
};
