import { defineCustomElements } from "../dist/esm/loader";
import { setStencilDocJson } from "@pxtrn/storybook-addon-docs-stencil";

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
};
