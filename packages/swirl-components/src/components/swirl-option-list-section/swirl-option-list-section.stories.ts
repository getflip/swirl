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
  const container = document.createElement("swirl-option-list");
  container.value = ["2"];

  container.setAttribute("aria-label", "Option list");
  container.setAttribute("role", "listbox");

  const sectionOne = generateStoryElement("swirl-option-list-section", args);
  const sectionTwo = generateStoryElement("swirl-option-list-section", args);

  sectionOne.innerHTML = `
    <swirl-option-list-item label="This is an option" value="1"></swirl-option-list-item>
    <swirl-option-list-item label="This is an option" value="2"></swirl-option-list-item>
    <swirl-option-list-item label="This is an option" value="3"></swirl-option-list-item>
  `;
  sectionTwo.innerHTML = `
    <swirl-option-list-item label="This is an option" value="4"></swirl-option-list-item>
    <swirl-option-list-item label="This is an option" value="5"></swirl-option-list-item>
    <swirl-option-list-item label="This is an option" value="6"></swirl-option-list-item>
  `;

  container.append("\n  ", sectionOne, "\n");
  container.append("\n  ", sectionTwo, "\n");

  return container;
};

export const SwirlOptionListSection = Template.bind({});

SwirlOptionListSection.args = {
  label: "Section label",
  hasSeparator: true,
};
