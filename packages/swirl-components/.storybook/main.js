import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const storybookClientLogger = require.resolve(
  "storybook/internal/client-logger"
);
const storybookPreviewApi = require.resolve("storybook/preview-api");

/** @type { import('@storybook/html-vite').StorybookConfig } */
export default {
  addons: [
    "@storybook/addon-docs",
    "@pxtrn/storybook-addon-docs-stencil",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
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
  experimental_indexers: async (existingIndexers) => {
    const mdxIndexer = {
      test: /\.stories\.mdx$/,
      createIndex: async (fileName, { makeTitle }) => {
        const content = await readFile(fileName, "utf-8");
        const match = content.match(/title=["']([^"']+)["']/);
        const title = match ? match[1] : undefined;
        return [
          {
            type: "docs",
            importPath: fileName,
            exportName: "default",
            title: makeTitle(title),
          },
        ];
      },
    };
    return [...existingIndexers, mdxIndexer];
  },
  viteFinal: (config, { configType }) => {
    // Alias @storybook/* for Stencil docs addon
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@storybook/client-logger": storybookClientLogger,
      "@storybook/preview-api": storybookPreviewApi,
    };

    // Workaround for Storybook 10 MDX plugin generating file:// URLs that Vite cannot resolve
    // https://github.com/storybookjs/storybook/issues/33537
    config.plugins = config.plugins || [];
    config.plugins.push({
      name: "fix-mdx-react-shim",
      enforce: "pre",
      resolveId(source) {
        if (
          source.startsWith("file://") &&
          source.includes("mdx-react-shim.js")
        ) {
          return new URL(source).pathname;
        }
        return null;
      },
    });

    return config;
  },
};
