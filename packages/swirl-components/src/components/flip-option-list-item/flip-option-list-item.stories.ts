import { generateStoryElement } from "../../utils";
import Docs from "./flip-option-list-item.mdx";

export default {
  component: "flip-option-list-item",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipOptionListItem",
};

const Template = (args) => {
  const container = document.createElement("div");

  container.setAttribute("aria-label", "Option list");
  container.setAttribute("role", "listbox");

  const element = generateStoryElement("flip-option-list-item", args);

  container.append("\n  ", element, "\n");

  return container;
};

export const FlipOptionListItem = Template.bind({});

FlipOptionListItem.args = {
  icon: `<flip-icon-mention></flip-icon-mention>`,
  label: "Option List Item",
  value: "Value",
};
