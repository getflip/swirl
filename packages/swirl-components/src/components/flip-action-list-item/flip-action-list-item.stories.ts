import { generateStoryElement } from "../../utils";
import Docs from "./flip-action-list-item.mdx";

export default {
  component: "flip-action-list-item",
  decorators: [
    (story) => {
      const container = document.createElement("div");

      container.setAttribute("role", "menu");
      container.append(story());

      return container;
    },
  ],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipActionListItem",
};

const Template = (args) => {
  const element = generateStoryElement("flip-action-list-item", args);

  return element;
};

export const FlipActionListItem = Template.bind({});

FlipActionListItem.args = {
  description: "Description of the action list item",
  icon: `<flip-icon-mention></flip-icon-mention>`,
  label: "This is an action",
  suffix: `<flip-icon-chevron-right></flip-icon-chevron-right>`,
};
