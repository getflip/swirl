import { defineCustomElements } from "../loader";
import { setStencilDocJson } from "@pxtrn/storybook-addon-docs-stencil";
import { themes } from "@storybook/theming";

import swirlTheme from "./theme";
import docJson from "../components.json";

import "../dist/swirl-components/swirl-components.css";

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
    theme: swirlTheme,
  },
  themes: {
    default: "default-light",
    list: [
      { name: "default-light", class: "theme-default-light", color: "#fff" },
      { name: "default-dark", class: "theme-default-dark", color: "#232426" },
      { name: "tenant-light", class: "theme-tenant-light", color: "#c3002d" },
    ],
  },
  viewMode: "docs",
  viewport: {
    viewports: {
      smallMobile: {
        name: "Small Mobile",
        styles: {
          width: "320px",
          height: "480px",
        },
      },
      mobile: {
        name: "Mobile",
        styles: {
          width: "375px",
          height: "667px",
        },
      },
      tablet: {
        name: "Tablet",
        styles: {
          width: "1024px",
          height: "768px",
        },
      },
      smallDesktop: {
        name: "Desktop",
        styles: {
          width: "1200px",
          height: "992px",
        },
      },
    },
  },
};
