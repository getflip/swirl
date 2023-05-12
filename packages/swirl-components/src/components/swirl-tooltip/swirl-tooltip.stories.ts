import { generateStoryElement } from "../../utils";
// @ts-ignore
import Docs from "./swirl-tooltip.mdx";

export default {
  component: "swirl-tooltip",
  tags: ["autodocs"],
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
  title: "Components/SwirlTooltip",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-tooltip", args);

  element.innerHTML = "Hover or focus me";

  return element;
};

export const SwirlTooltip = Template.bind({});

SwirlTooltip.args = {
  content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid officia, enim reiciendis esse minus impedit earum veniam, sunt eveniet.`,
  position: "top",
};
