import { generateStoryElement } from "../../utils";
import Docs from "./swirl-tree-navigation-item.mdx";

export default {
  component: "swirl-tree-navigation-item",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Admin/SwirlTreeNavigationItem",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-tree-navigation-item", args);

  return element;
};

export const SwirlTreeNavigationItem = Template.bind({});

SwirlTreeNavigationItem.args = {
  icon: "file",
  label: "Label",
};
