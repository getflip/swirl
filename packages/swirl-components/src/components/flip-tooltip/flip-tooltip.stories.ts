import { generateStoryElement } from "../../utils";
// @ts-ignore
import Docs from "./flip-tooltip.mdx";

export default {
  component: "flip-tooltip",
  decorators: [
    (story) => {
      const container = document.createElement("div");

      container.style.display = "flex";
      container.style.alignItems = "center";
      container.style.justifyContent = "center";
      container.style.padding = "140px";
      container.append(story());

      return container;
    },
  ],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipTooltip",
};

const Template = (args) => {
  const element = generateStoryElement("flip-tooltip", args);

  element.innerHTML = "Hover or focus me";

  return element;
};

export const FlipTooltip = Template.bind({});

FlipTooltip.args = {
  position: "top",
  tooltip: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid officia, enim reiciendis esse minus impedit earum veniam, sunt eveniet.`,
  tooltipId: "tooltip",
};
