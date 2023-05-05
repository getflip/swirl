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
  const container = document.createElement("div");

  container.setAttribute("role", "menu");

  const element = generateStoryElement("swirl-action-list-section", args);

  element.innerHTML = `
    <swirl-action-list-item label="This is an action"></swirl-action-list-item>
    <swirl-action-list-item label="This is an action"></swirl-action-list-item>
    <swirl-action-list-item label="This is an action"></swirl-action-list-item>
  `;

  container.append("\n  ", element, "\n");

  return container;
};

export const SwirlActionListSection = Template.bind({});

SwirlActionListSection.args = {
  label: "Section label",
};
