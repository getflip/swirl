import { generateStoryElement } from "../../utils";
import Docs from "./flip-tree-navigation-item.mdx";

export default {
  argTypes: {
    icon: {
      table: {
        type: {
          detail: "e.g. <flip-icon-close></flip-icon-close>",
          summary: "flip-icon-*",
        },
      },
    },
  },
  component: "flip-tree-navigation-item",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Admin/FlipTreeNavigationItem",
};

const Template = (args) => {
  const element = generateStoryElement("flip-tree-navigation-item", args);

  return element;
};

export const FlipTreeNavigationItem = Template.bind({});

FlipTreeNavigationItem.args = {
  icon: "<flip-icon-arrow-right-small></flip-icon-arrow-right-small>",
  label: "Label",
};
