import { generateStoryElement } from "../../utils";
import Docs from "./swirl-option-list-item.mdx";

export default {
  argTypes: {
    allowDrag: {
      description: `Should not be set manually. Use the "alowDrag" property of the SwirlOptionList component to make items draggable."`,
    },
    dragging: {
      description: `Should not be set manually. Use the "alowDrag" property of the SwirlOptionList component to make items draggable."`,
    },
  },
  component: "swirl-option-list-item",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlOptionListItem",
};

const Template = (args) => {
  const container = document.createElement("div");

  container.setAttribute("aria-label", "Option list");
  container.setAttribute("role", "listbox");

  const element = generateStoryElement("swirl-option-list-item", args);

  element.innerHTML = `
    <swirl-avatar label="John Doe" initials="PS" slot="avatar" src="https://picsum.photos/id/433/144/144"></swirl-avatar>
  `;

  container.append("\n  ", element, "\n");

  return container;
};

export const SwirlOptionListItem = Template.bind({});

SwirlOptionListItem.args = {
  label: "Option List Item",
  value: "Value",
  icon: `<swirl-icon-mention></swirl-icon-mention>`,
  iconBadge: `<swirl-badge label="1"></swirl-badge>`,
};
