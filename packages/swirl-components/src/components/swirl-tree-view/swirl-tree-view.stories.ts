import { generateStoryElement } from "../../utils";
import Docs from "./swirl-tree-view.mdx";

export default {
  component: "swirl-tree-view",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlTreeView",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-tree-view", args);

  element.innerHTML = `
    <swirl-tree-view-item href="#" icon="🪁" id="item-1" label="Item 1">
      <swirl-tree-view-item href="#" icon="🍄" id="item-2" label="Item 1.1"></swirl-tree-view-item>
      <swirl-tree-view-item href="#" icon="🌎" id="item-3" label="Item 1.2">
        <swirl-tree-view-item href="#" icon="❄️" id="item-4" label="Item 1.2.1"></swirl-tree-view-item>
        <swirl-tree-view-item href="#" icon="🌭" id="item-5" label="Item 1.2.2"></swirl-tree-view-item>
      </swirl-tree-view-item>
      <swirl-tree-view-item href="#" icon="🎾" id="item-6" label="Item 1.3"></swirl-tree-view-item>
    </swirl-tree-view-item>
    <swirl-tree-view-item href="#" icon="🎷" id="item-7" label="Item 2">
      <swirl-tag bordered id="item-2" label="Draft" size="s" slot="tags"></swirl-tag>
    </swirl-tree-view-item>
    <swirl-tree-view-item href="#" icon="🎮" id="item-8" label="Item 3">
      <swirl-tree-view-item href="#" icon="💈" id="item-9" label="Item 3.1"></swirl-tree-view-item>
    </swirl-tree-view-item>
  `;

  return element;
};

export const SwirlTreeView = Template.bind({});

SwirlTreeView.args = {
  label: "Tree view",
};
