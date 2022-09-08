import { generateStoryElement } from "../../utils";
import Docs from "./flip-action-list-item.mdx";

export default {
  component: "flip-action-list-item",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipActionListItem",
};

const Template = (args) => {
  const element = generateStoryElement("flip-action-list-item", args);

  return element;
};

export const FlipActionListItem = Template.bind({});

FlipActionListItem.args = {
  description: "Description",
  icon: `<flip-icon-mention></flip-icon-mention>`,
  label: "Label",
};
