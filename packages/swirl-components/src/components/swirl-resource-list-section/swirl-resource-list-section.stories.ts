import { generateStoryElement } from "../../utils";
import Docs from "./swirl-resource-list-section.mdx";

export default {
  component: "swirl-resource-list-section",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlResourceListSection",
};

const Template = (args) => {
  const container = document.createElement("swirl-resource-list");

  container.setAttribute("role", "menu");

  const sectionOne = generateStoryElement("swirl-resource-list-section", args);
  const sectionTwo = generateStoryElement("swirl-resource-list-section", args);

  sectionOne.innerHTML = `
    <swirl-resource-list-item label="Resource list item"></swirl-resource-list-item>
    <swirl-resource-list-item label="Resource list item"></swirl-resource-list-item>
  `;

  sectionTwo.innerHTML = sectionOne.innerHTML;

  container.append("\n  ", sectionOne, "\n");
  container.append("\n  ", sectionTwo, "\n");

  return container;
};

export const SwirlResourceListSection = Template.bind({});

SwirlResourceListSection.args = {
  label: "Section label",
};
