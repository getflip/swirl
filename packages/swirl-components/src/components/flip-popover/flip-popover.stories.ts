import { generateStoryElement } from "../../utils";
import Docs from "./flip-popover.mdx";

export default {
  component: "flip-popover",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipPopover",
};

const Template = (args) => {
  const element = generateStoryElement("flip-popover", args);

  element.innerHTML = `
    <flip-button label="Trigger popover" slot="trigger"></flip-button>
    <flip-action-list slot="content">
      <flip-action-list-item icon="<flip-icon-mention></flip-icon-mention>" label="Action item 1"></flip-action-list-item>
      <flip-action-list-item icon="<flip-icon-mention></flip-icon-mention>" label="Action item 2"></flip-action-list-item>
      <flip-action-list-item icon="<flip-icon-mention></flip-icon-mention>" label="Action item 3"></flip-action-list-item>
    </flip-action-list>
  `;

  return element;
};

export const FlipPopover = Template.bind({});

FlipPopover.args = {
  label: "Popover",
};
