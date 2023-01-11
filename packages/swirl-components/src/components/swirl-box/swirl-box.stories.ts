import { generateStoryElement } from "../../utils";
import Docs from "./swirl-box.mdx";

export default {
  component: "flip-box",
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
  title: "Components/FlipBox",
};

const Template = (args) => {
  const element = generateStoryElement("flip-box", args);

  element.innerHTML = `\n    <flip-chip label="Label"></flip-chip>\n  `;

  return element;
};

export const FlipBox = Template.bind({});

FlipBox.args = {
  cover: true,
  padding: "16",
};
