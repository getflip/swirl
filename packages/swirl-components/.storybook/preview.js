import { defineCustomElements } from "../dist/components";
import { setStencilDocJson } from "@pxtrn/storybook-addon-docs-stencil";
import { withThemeByClassName } from "@storybook/addon-themes";

import swirlTheme from "./theme";
import docJson from "../components.json";

import "../dist/swirl-components/swirl-components.css";

defineCustomElements();

if (docJson) {
  setStencilDocJson(docJson);
}

/** @type { import('@storybook/html').Preview } */
const preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        Light: "theme-light",
        Dark: "theme-dark",
      },
      defaultTheme: "Light",
      parentSelector: "html",
    }),
    (Story) => {
      // Fix: prevent Storybook from overriding CSS custom properties (preview runs in iframe)
      if (typeof document !== "undefined" && document.documentElement) {
        document.documentElement.style = "";
      }
      return Story();
    },
  ],
  parameters: {
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
  },
};

export default preview;
