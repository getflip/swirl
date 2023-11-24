import { generateStoryElement } from "../../utils";
import Docs from "./swirl-theme-provider.mdx";

export default {
  component: "swirl-theme-provider",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
      source: {
        code: `<swirl-theme-provider>
  <!-- Your app components … -->
</swirl-theme-provider>

<script>
  const provider = document.querySelector('swirl-theme-provider');

  provider.config = {
    themes: {
      light: { … },
      dark: { … }
    }
  };

  provider.setPreferredOSTheme('dark');
</script>`,
      },
      story: {
        inline: false,
      },
    },
  },
  title: "Components/SwirlThemeProvider",
};

const Template = (args) => {
  const element = generateStoryElement(
    "swirl-theme-provider",
    args
  ) as HTMLSwirlThemeProviderElement;

  const config = {
    themes: {
      dark: {
        favicon: {
          id: "d3458010-97c6-40a7-896d-804ab6c33496",
          link: "https://master.flip-app.dev/media/themes/d3458010-97c6-40a7-896d-804ab6c33496",
          file_name: "dark-favIcon.png",
        },
        company_icon: {
          id: "6d1c1da4-fa4b-4d77-b44d-b1fa58ed6337",
          link: "https://master.flip-app.dev/media/themes/6d1c1da4-fa4b-4d77-b44d-b1fa58ed6337",
          file_name: "dark-companyIcon.png",
        },
        company_logo: {
          id: "618f411b-eaad-4c06-8834-54fce38fcbad",
          link: "https://master.flip-app.dev/media/themes/618f411b-eaad-4c06-8834-54fce38fcbad",
          file_name: "dark-companyLogo.png",
        },
        design_tokens: [
          {
            id: "text-highlight",
            color: {
              r: 86,
              g: 143,
              b: 222,
              a: 255,
            },
          },
          {
            id: "text-on-action-primary",
            color: {
              r: 0,
              g: 0,
              b: 0,
              a: 255,
            },
          },
          {
            id: "text-on-surface-highlight",
            color: {
              r: 242,
              g: 242,
              b: 242,
              a: 255,
            },
          },
          {
            id: "icon-highlight",
            color: {
              r: 86,
              g: 143,
              b: 222,
              a: 255,
            },
          },
          {
            id: "icon-on-action-primary",
            color: {
              r: 0,
              g: 0,
              b: 0,
              a: 255,
            },
          },
          {
            id: "icon-on-surface-highlight",
            color: {
              r: 242,
              g: 242,
              b: 242,
              a: 255,
            },
          },
          {
            id: "border-highlight",
            color: {
              r: 86,
              g: 143,
              b: 222,
              a: 255,
            },
          },
          {
            id: "focus-default",
            color: {
              r: 86,
              g: 143,
              b: 222,
              a: 255,
            },
          },
          {
            id: "interactive-primary-default",
            color: {
              r: 86,
              g: 143,
              b: 222,
              a: 255,
            },
          },
          {
            id: "interactive-primary-hovered",
            color: {
              r: 121,
              g: 164,
              b: 223,
              a: 255,
            },
          },
          {
            id: "interactive-primary-pressed",
            color: {
              r: 121,
              g: 164,
              b: 223,
              a: 255,
            },
          },
          {
            id: "surface-highlight-default",
            color: {
              r: 45,
              g: 71,
              b: 127,
              a: 255,
            },
          },
          {
            id: "surface-highlight-hovered",
            color: {
              r: 52,
              g: 80,
              b: 141,
              a: 255,
            },
          },
          {
            id: "surface-highlight-pressed",
            color: {
              r: 64,
              g: 91,
              b: 151,
              a: 255,
            },
          },
          {
            id: "on-surface-highlight-default",
            color: {
              r: 52,
              g: 80,
              b: 141,
              a: 255,
            },
          },
          {
            id: "action-primary-default",
            color: {
              r: 255,
              g: 0,
              b: 0,
              a: 255,
            },
          },
          {
            id: "action-primary-hovered",
            color: {
              r: 121,
              g: 164,
              b: 223,
              a: 255,
            },
          },
          {
            id: "action-primary-pressed",
            color: {
              r: 121,
              g: 164,
              b: 223,
              a: 255,
            },
          },
        ],
      },
      light: {
        favicon: {
          id: "49ab1bb9-17d9-45c0-87b4-2247bb8c3648",
          link: "https://master.flip-app.dev/media/themes/49ab1bb9-17d9-45c0-87b4-2247bb8c3648",
          file_name: "light-favIcon.png",
        },
        company_icon: {
          id: "0eaddd17-3468-4243-bdd8-6fae1222e032",
          link: "https://master.flip-app.dev/media/themes/0eaddd17-3468-4243-bdd8-6fae1222e032",
          file_name: "light-companyIcon.png",
        },
        company_logo: {
          id: "b39cb0c9-9097-48c8-900b-6e24686aac5e",
          link: "https://master.flip-app.dev/media/themes/b39cb0c9-9097-48c8-900b-6e24686aac5e",
          file_name: "light-companyLogo.png",
        },
        design_tokens: [
          {
            id: "text-highlight",
            color: {
              r: 0,
              g: 55,
              b: 175,
              a: 255,
            },
          },
          {
            id: "text-on-action-primary",
            color: {
              r: 255,
              g: 255,
              b: 255,
              a: 255,
            },
          },
          {
            id: "text-on-surface-highlight",
            color: {
              r: 23,
              g: 23,
              b: 23,
              a: 255,
            },
          },
          {
            id: "icon-highlight",
            color: {
              r: 0,
              g: 55,
              b: 175,
              a: 255,
            },
          },
          {
            id: "icon-on-action-primary",
            color: {
              r: 255,
              g: 255,
              b: 255,
              a: 255,
            },
          },
          {
            id: "icon-on-surface-highlight",
            color: {
              r: 23,
              g: 23,
              b: 23,
              a: 255,
            },
          },
          {
            id: "border-highlight",
            color: {
              r: 0,
              g: 55,
              b: 175,
              a: 255,
            },
          },
          {
            id: "focus-default",
            color: {
              r: 0,
              g: 55,
              b: 175,
              a: 255,
            },
          },
          {
            id: "interactive-primary-default",
            color: {
              r: 0,
              g: 55,
              b: 175,
              a: 255,
            },
          },
          {
            id: "interactive-primary-hovered",
            color: {
              r: 38,
              g: 85,
              b: 187,
              a: 255,
            },
          },
          {
            id: "interactive-primary-pressed",
            color: {
              r: 38,
              g: 85,
              b: 187,
              a: 255,
            },
          },
          {
            id: "surface-highlight-default",
            color: {
              r: 230,
              g: 238,
              b: 255,
              a: 255,
            },
          },
          {
            id: "surface-highlight-hovered",
            color: {
              r: 213,
              g: 226,
              b: 255,
              a: 255,
            },
          },
          {
            id: "surface-highlight-pressed",
            color: {
              r: 190,
              g: 210,
              b: 255,
              a: 255,
            },
          },
          {
            id: "on-surface-highlight-default",
            color: {
              r: 213,
              g: 226,
              b: 255,
              a: 255,
            },
          },
          {
            id: "action-primary-default",
            color: {
              r: 0,
              g: 255,
              b: 0,
              a: 255,
            },
          },
          {
            id: "action-primary-hovered",
            color: {
              r: 55,
              g: 115,
              b: 247,
              a: 255,
            },
          },
          {
            id: "action-primary-pressed",
            color: {
              r: 55,
              g: 115,
              b: 247,
              a: 255,
            },
          },
        ],
      },
    },
  };

  const lightModeButton = document.createElement("swirl-button");
  lightModeButton.intent = "primary";
  lightModeButton.variant = "flat";
  lightModeButton.label = "Set light mode";
  lightModeButton.style.marginRight = "1rem";
  lightModeButton.addEventListener("click", () => {
    element.setPreferredOSTheme("light");
  });

  const darkModeButton = document.createElement("swirl-button");
  darkModeButton.intent = "primary";
  darkModeButton.variant = "flat";
  darkModeButton.label = "Set dark mode";
  darkModeButton.style.marginRight = "1rem";
  darkModeButton.addEventListener("click", () => {
    element.setPreferredOSTheme("dark");
  });

  const tenantButton = document.createElement("swirl-button");
  tenantButton.intent = "primary";
  tenantButton.variant = "flat";
  tenantButton.label = "Set tenant theme";
  tenantButton.style.marginRight = "1rem";
  tenantButton.addEventListener("click", () => {
    element.config = config;
  });

  const resetButton = document.createElement("swirl-button");
  resetButton.label = "Reset";
  resetButton.style.marginRight = "1rem";
  resetButton.addEventListener("click", () => {
    element.config = { themes: undefined };
    element.resetPreferredOSTheme();
  });

  element.append(lightModeButton, darkModeButton, tenantButton, resetButton);

  return element;
};

export const SwirlThemeProvider = Template.bind({});

SwirlThemeProvider.args = {};
