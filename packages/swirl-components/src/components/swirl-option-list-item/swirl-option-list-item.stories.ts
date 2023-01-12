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

  container.append("\n  ", element, "\n");

  return container;
};

export const SwirlOptionListItem = Template.bind({});

SwirlOptionListItem.args = {
  icon: `<swirl-icon-mention></swirl-icon-mention>`,
  label: "Option List Item",
  value: "Value",
};
