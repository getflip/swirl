import { generateStoryElement } from "../../utils";
import Docs from "./swirl-action-list.mdx";

export default {
  component: "swirl-action-list",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlActionList",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-action-list", args);

  element.innerHTML = `
    <swirl-action-list-item icon="<swirl-icon-mention></swirl-icon-mention>" label="Action item 1"></swirl-action-list-item>
    <swirl-action-list-item icon="<swirl-icon-mention></swirl-icon-mention>" label="Action item 2"></swirl-action-list-item>
    <swirl-separator></swirl-separator>
    <swirl-action-list-item icon="<swirl-icon-mention></swirl-icon-mention>" label="Action item 3"></swirl-action-list-item>
  `;

  return element;
};

export const SwirlActionList = Template.bind({});

SwirlActionList.args = {};
