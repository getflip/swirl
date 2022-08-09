import { defineCustomElements } from "../loader";
import { setStencilDocJson } from "@pxtrn/storybook-addon-docs-stencil";
import { themes } from "@storybook/theming";

import docJson from "../components.json";

defineCustomElements();

if (docJson) {
  setStencilDocJson(docJson);
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    hideNoControlsWarning: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: {
      base: "light",

      appBg: "white",
      appBorderColor: "rgba(0, 6, 29, 0.09)",
      appBorderRadius: 8,
      appContentBg: "white",
      barBg: "white",
      barSelectedColor: "rgba(0, 0, 0, 1)",
      barTextColor: "rgba(142, 142, 147, 1)",
      colorPrimary: "rgba(0, 38, 255, 1)",
      colorSecondary: "rgba(0, 38, 255, 1)",
      fontBase: '"Open Sans", sans-serif',
      fontCode:
        'ui-monospace, Menlo, Monaco, "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Droid Sans Mono", "Courier New", monospace',
      inputBg: "white",
      inputBorder: "rgba(0, 6, 29, 0.09)",
      inputBorderRadius: 4,
      inputTextColor: "rgba(0, 0, 0, 1)",
      textColor: "rgba(0, 0, 0, 1)",
      textInverseColor: "white",
      textMutedColor: "rgba(142, 142, 147, 1)",
    },
  },
};
