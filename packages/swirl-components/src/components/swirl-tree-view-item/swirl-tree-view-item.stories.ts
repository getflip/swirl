import { generateStoryElement } from "../../utils";
import Docs from "./swirl-tree-view-item.mdx";

export default {
  component: "swirl-tree-view-item",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlTreeViewItem",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-tree-view-item", args);

  return element;
};

export const SwirlTreeViewItem = Template.bind({});

SwirlTreeViewItem.args = {
  href: "#",
  icon: "🪁",
  itemId: "item",
  label: "Label",
};
