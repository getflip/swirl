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
    <flip-action-list slot="content">
      <li><button type="button" role="menuitem" tabindex="-1">Menu item #1</button></li>
      <li><button type="button" role="menuitem" tabindex="-1">Menu item #2</button></li>
    </flip-action-list>
  `;

  return element;
};

export const FlipPopover = Template.bind({});

FlipPopover.args = {
  label: "Popover",
};
