import { generateStoryElement } from "../../utils";
import Docs from "./swirl-option-list-section.mdx";

export default {
  component: "flip-option-list-section",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipOptionListSection",
};

const Template = (args) => {
  const container = document.createElement("div");

  container.setAttribute("aria-label", "Option list");
  container.setAttribute("role", "listbox");

  const element = generateStoryElement("flip-option-list-section", args);

  element.innerHTML = `
    <flip-option-list-item label="This is an option" value="1"></flip-option-list-item>
    <flip-option-list-item label="This is an option" selected="true" value="2"></flip-option-list-item>
    <flip-option-list-item label="This is an option" value="3"></flip-option-list-item>
  `;

  container.append("\n  ", element, "\n");

  return container;
};

export const FlipOptionListSection = Template.bind({});

FlipOptionListSection.args = {
  label: "Section label",
};
