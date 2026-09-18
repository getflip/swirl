import { generateStoryElement } from "../../utils";
import Docs from "./swirl-action-list.mdx";

export default {
  component: "swirl-action-list",
  tags: ["autodocs"],
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
    <swirl-tooltip id="action-2-disabled-reason" content="This action is currently disabled" position="top">
      <swirl-action-list-item icon="<swirl-icon-mention></swirl-icon-mention>" label="Action item 2" swirl-aria-disabled swirl-aria-describedby="action-2-disabled-reason"></swirl-action-list-item>
    </swirl-tooltip>
    <swirl-action-list-item icon="<swirl-icon-mention></swirl-icon-mention>" label="Action item 3"></swirl-action-list-item>
    <swirl-separator></swirl-separator>
    <swirl-action-list-item icon="<swirl-icon-mention></swirl-icon-mention>" label="Action item 4"></swirl-action-list-item>
  `;

  return element;
};

export const SwirlActionList = Template.bind({});

SwirlActionList.args = {};
