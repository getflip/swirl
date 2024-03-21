import { generateStoryElement } from "../../utils";
import Docs from "./swirl-action-list-item.mdx";

export default {
  component: "swirl-action-list-item",
  tags: ["autodocs"],
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

  element.innerHTML = `<swirl-switch checked hide-label label="Test" slot="suffix"></swirl-switch>`;

  return element;
};

export const SwirlActionListItem = Template.bind({});

SwirlActionListItem.args = {
  badge: "Badge",
  description: "Description of the action list item",
  icon: `<swirl-icon-mention></swirl-icon-mention>`,
  label: "This is an action",
  suffix: `<swirl-icon-chevron-right></swirl-icon-chevron-right>`,
};
