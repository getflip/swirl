import { generateStoryElement } from "../../utils";
import Docs from "./swirl-action-list-section.mdx";

export default {
  component: "swirl-action-list-section",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlActionListSection",
};

const Template = (args) => {
  const container = document.createElement("swirl-action-list");

  container.setAttribute("role", "menu");

  const sectionOne = generateStoryElement("swirl-action-list-section", args);
  const sectionTwo = generateStoryElement("swirl-action-list-section", args);

  sectionOne.innerHTML = `
    <swirl-action-list-item label="This is an action"></swirl-action-list-item>
    <swirl-action-list-item label="This is an action"></swirl-action-list-item>
    <swirl-action-list-item label="This is an action"></swirl-action-list-item>
  `;

  sectionTwo.innerHTML = sectionOne.innerHTML;

  container.append("\n  ", sectionOne, "\n");
  container.append("\n  ", sectionTwo, "\n");

  return container;
};

export const SwirlActionListSection = Template.bind({});

SwirlActionListSection.args = {
  label: "Section label",
  hasSeparator: true,
};
