import { generateStoryElement } from "../../utils";
import Docs from "./swirl-box.mdx";

export default {
  component: "swirl-box",
  tags: ["autodocs"],
  decorators: [
    (story) => {
      const container = document.createElement("div");

      container.style.height = "200px";
      container.append("\n  ", story(), "\n");

      return container;
    },
  ],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlBox",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-box", args);

  element.innerHTML = `\n    <swirl-chip label="Label"></swirl-chip>\n  `;

  return element;
};

export const SwirlBox = Template.bind({});

SwirlBox.args = {};
