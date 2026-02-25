import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const storybookClientLogger = require.resolve(
  "storybook/internal/client-logger"
);
const storybookPreviewApi = require.resolve("storybook/preview-api");

const VIRTUAL_PREFIX = "virtual:stories-mdx-docs";

const mdxIndexer = {
  test: /\.stories\.mdx$/,
  createIndex: async (fileName, { makeTitle }) => {
    const content = await readFile(fileName, "utf-8");
    const match = content.match(/title=["']([^"']+)["']/);
    const title = match ? match[1] : undefined;
    const importPath = `${VIRTUAL_PREFIX}?file=${encodeURIComponent(
      fileName
    )}&title=${encodeURIComponent(makeTitle(title ?? ""))}`;
    return [
      {
        type: "story",
        importPath,
        exportName: "Default",
        title: makeTitle(title),
      },
    ];
  },
};

/** @type { import('@storybook/html-vite').StorybookConfig } */
export default {
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-mdx-gfm",
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
  features: {
    backgrounds: false,
    actions: false,
  },
  staticDirs: ["../src/assets", "../public"],
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  experimental_indexers: async (existingIndexers) => [
    ...existingIndexers,
    mdxIndexer,
  ],
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

    // Wrap docs-only .stories.mdx in CSF so Storybook finds a "Default" story
    config.plugins.push({
      name: "stories-mdx-docs-csf",
      resolveId(source) {
        if (source.startsWith(VIRTUAL_PREFIX)) return source;
        return null;
      },
      load(id) {
        if (!id.startsWith(VIRTUAL_PREFIX)) {
          return null;
        }

        const params = new URLSearchParams(id.slice(VIRTUAL_PREFIX.length + 1));
        const file = params.get("file");
        const title = params.get("title") ?? "Docs";

        if (!file) {
          return null;
        }

        const mdxPath = file;

        return [
          "import React from 'react';",
          "import { createRoot } from 'react-dom/client';",
          "import { ThemeProvider, ensure, themes } from 'storybook/theming';",
          "const docsTheme = ensure(themes.light);",
          `import MDXContent from ${JSON.stringify(mdxPath)};`,
          `export default { title: ${JSON.stringify(title)} };`,
          `export const Default = {
            render: () => {
              const wrapper = document.createElement('div');
              wrapper.classList.add('sb-main-padded');
              wrapper.classList.add('docs-story');
              const el = document.createElement('div');
              el.classList.add('sbdocs');
              el.classList.add('sbdocs-content');
              wrapper.appendChild(el);
              createRoot(el).render(
                React.createElement(ThemeProvider, { theme: docsTheme }, React.createElement(MDXContent))
              );
              return wrapper;
            }
            };
          `,
        ].join("\n");
      },
    });

    return config;
  },
};
