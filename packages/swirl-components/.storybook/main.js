import remarkGfm from "remark-gfm";

module.exports = {
  addons: [
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    "@storybook/addon-controls",
    "@storybook/addon-measure",
    "@storybook/addon-toolbars",
    "@storybook/addon-viewport",
    "@pxtrn/storybook-addon-docs-stencil",
    "@storybook/addon-a11y",
    "storybook-addon-themes",
    "storybook-design-token",
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
