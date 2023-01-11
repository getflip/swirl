import { generateStoryElement } from "../../utils";
import Docs from "./swirl-action-list-section.mdx";

export default {
  component: "flip-action-list-section",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipActionListSection",
};

const Template = (args) => {
  const container = document.createElement("div");

  container.setAttribute("role", "menu");

  const element = generateStoryElement("flip-action-list-section", args);

  element.innerHTML = `
    <flip-action-list-item label="This is an action"></flip-action-list-item>
    <flip-action-list-item label="This is an action"></flip-action-list-item>
    <flip-action-list-item label="This is an action"></flip-action-list-item>
  `;

  container.append("\n  ", element, "\n");

  return container;
};

export const FlipActionListSection = Template.bind({});

FlipActionListSection.args = {
  label: "Section label",
};
