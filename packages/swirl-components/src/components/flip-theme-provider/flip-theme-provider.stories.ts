import { generateStoryElement } from "../../utils";
import Docs from "./flip-theme-provider.mdx";

export default {
  component: "flip-theme-provider",
  parameters: {
    docs: {
      inlineStories: false,
      page: Docs,
      source: {
        code: `<flip-theme-provider>
  <!-- Your app components … -->
</flip-theme-provider>

<script>
  const provider = document.querySelector('flip-theme-provider');

  provider.config = {
    tenantColors: {
      primary: "rgba(184, 42, 32, 1)",
      primaryContrast: "rgba(255, 255, 255, 1)",
      secondary: "rgba(184, 42, 32, 1)",
      secondaryContrast: "rgba(255, 255, 255, 1)",
      text: "rgba(218, 31, 61, 1)",
    }
  };

  provider.setPreferredTheme('dark');
</script>`,
      },
    },
  },
  title: "Components/FlipThemeProvider",
};

const Template = (args) => {
  const element = generateStoryElement(
    "flip-theme-provider",
    args
  ) as HTMLFlipThemeProviderElement;

  const config = {
    tenantColors: {
      primary: "rgba(184, 42, 32, 1)",
      primaryContrast: "rgba(255, 255, 255, 1)",
      secondary: "rgba(184, 42, 32, 1)",
      secondaryContrast: "rgba(255, 255, 255, 1)",
      text: "rgba(218, 31, 61, 1)",
    },
  };

  const lightModeButton = document.createElement("flip-button");
  lightModeButton.intent = "primary";
  lightModeButton.variant = "flat";
  lightModeButton.label = "Set light mode";
  lightModeButton.style.marginRight = "1rem";
  lightModeButton.addEventListener("click", () => {
    element.setPreferredTheme("light");
  });

  const darkModeButton = document.createElement("flip-button");
  darkModeButton.intent = "primary";
  darkModeButton.variant = "flat";
  darkModeButton.label = "Set dark mode";
  darkModeButton.style.marginRight = "1rem";
  darkModeButton.addEventListener("click", () => {
    element.setPreferredTheme("dark");
  });

  const tenantButton = document.createElement("flip-button");
  tenantButton.intent = "primary";
  tenantButton.variant = "flat";
  tenantButton.label = "Set tenant theme";
  tenantButton.style.marginRight = "1rem";
  tenantButton.addEventListener("click", () => {
    element.config = config;
  });

  const resetButton = document.createElement("flip-button");
  resetButton.label = "Reset";
  resetButton.style.marginRight = "1rem";
  resetButton.addEventListener("click", () => {
    element.config = { tenantColors: undefined };
    element.resetPreferredTheme();
  });

  element.append(lightModeButton, darkModeButton, tenantButton, resetButton);

  return element;
};

export const FlipThemeProvider = Template.bind({});

FlipThemeProvider.args = {};
