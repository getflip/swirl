import { generateStoryElement } from "../../utils";
import Docs from "./swirl-action-list-item.mdx";

export default {
  component: "swirl-action-list-item",
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
  title: "Components/SwirlActionListItem",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-action-list-item", args);

  return element;
};

export const SwirlActionListItem = Template.bind({});

SwirlActionListItem.args = {
  description: "Description of the action list item",
  icon: `<swirl-icon-mention></swirl-icon-mention>`,
  label: "This is an action",
  suffix: `<swirl-icon-chevron-right></swirl-icon-chevron-right>`,
};
