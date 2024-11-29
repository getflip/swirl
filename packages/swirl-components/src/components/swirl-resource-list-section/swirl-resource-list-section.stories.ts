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
  const container = document.createElement("div");

  container.setAttribute("role", "menu");

  const element = generateStoryElement("swirl-resource-list-section", args);

  element.innerHTML = `
    <swirl-resource-list-item label="Resource list item"></swirl-resource-list-item>
    <swirl-resource-list-item label="Resource list item"></swirl-resource-list-item>
    <swirl-resource-list-item label="Resource list item"></swirl-resource-list-item>
  `;

  container.append("\n  ", element, "\n");

  return container;
};

export const SwirlResourceListSection = Template.bind({});

SwirlResourceListSection.args = {
  label: "Section label",
};
