import { generateStoryElement } from "../../utils";
import Docs from "./swirl-action-list.mdx";

export default {
  component: "flip-action-list",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipActionList",
};

const Template = (args) => {
  const element = generateStoryElement("flip-action-list", args);

  element.innerHTML = `
    <flip-action-list-item icon="<flip-icon-mention></flip-icon-mention>" label="Action item 1"></flip-action-list-item>
    <flip-action-list-item icon="<flip-icon-mention></flip-icon-mention>" label="Action item 2"></flip-action-list-item>
    <flip-separator></flip-separator>
    <flip-action-list-item icon="<flip-icon-mention></flip-icon-mention>" label="Action item 3"></flip-action-list-item>
  `;

  return element;
};

export const FlipActionList = Template.bind({});

FlipActionList.args = {};
