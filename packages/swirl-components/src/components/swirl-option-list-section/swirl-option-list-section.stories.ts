import { generateStoryElement } from "../../utils";
import Docs from "./swirl-option-list-section.mdx";

export default {
  component: "swirl-option-list-section",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlOptionListSection",
};

const Template = (args) => {
  const container = document.createElement("div");

  container.setAttribute("aria-label", "Option list");
  container.setAttribute("role", "listbox");

  const element = generateStoryElement("swirl-option-list-section", args);

  element.innerHTML = `
    <swirl-option-list-item label="This is an option" value="1"></swirl-option-list-item>
    <swirl-option-list-item label="This is an option" selected="true" value="2"></swirl-option-list-item>
    <swirl-option-list-item label="This is an option" value="3"></swirl-option-list-item>
  `;

  container.append("\n  ", element, "\n");

  return container;
};

export const SwirlOptionListSection = Template.bind({});

SwirlOptionListSection.args = {
  label: "Section label",
};
