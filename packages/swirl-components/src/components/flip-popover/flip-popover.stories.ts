import { generateStoryElement } from "../../utils";
import Docs from "./flip-popover.mdx";

export default {
  component: "flip-popover",
  decorators: [
    (story) => {
      const container = document.createElement("div");

      container.style.minHeight = "100px";
      container.append(story());

      return container;
    },
  ],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipPopover",
};

const Template = (args) => {
  const element = generateStoryElement("flip-popover", args);

  element.innerHTML = `
    <flip-button label="Trigger popover" slot="trigger"></flip-button>
    <div slot="content">Content</div>
  `;

  return element;
};

export const FlipPopover = Template.bind({});

FlipPopover.args = {
  label: "Popover",
};
