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
  const element = generateStoryElement(
    "swirl-tree-view",
    args
  ) as HTMLSwirlTreeViewElement;

  element.innerHTML = `
    <swirl-tree-view-item href="#" icon="🪁" item-id="item-1" label="Item 1">
      <swirl-tree-view-item href="#" icon="🍄" item-id="item-1-1" label="Item 1.1"></swirl-tree-view-item>
      <swirl-tree-view-item href="#" icon="🌎" item-id="item-1-2" label="Item 1.2">
        <swirl-tree-view-item href="#" icon="❄️" item-id="item-1-2-1" label="Item 1.2.1"></swirl-tree-view-item>
        <swirl-tree-view-item href="#" icon="🌭" item-id="item-1-2-2" label="Item 1.2.2">
          <swirl-tag bordered item-id="item-2" label="Draft" size="s" slot="tags"></swirl-tag>
        </swirl-tree-view-item>
      </swirl-tree-view-item>
      <swirl-tree-view-item href="#" icon="🎾" item-id="item-1-3" label="Item 1.3">
        <swirl-tag bordered item-id="item-2" label="Draft" size="s" slot="tags"></swirl-tag>
      </swirl-tree-view-item>
    </swirl-tree-view-item>
    <swirl-tree-view-item href="#" icon="🎷" item-id="item-2" label="Item 2"></swirl-tree-view-item>
    <swirl-tree-view-item href="#" icon="file" item-id="item-3" label="Item 3">
      <swirl-tree-view-item href="#" icon="💈" item-id="item-3-1" label="Item 3.1"></swirl-tree-view-item>
    </swirl-tree-view-item>
  `;

  element.addEventListener("dropItem", (event) =>
    console.log(event.detail.newNextSiblingItemId)
  );

  return element;
};

export const SwirlTreeView = Template.bind({});

SwirlTreeView.args = {
  enableDragDrop: true,
  initiallyExpandedItemIds: ["item-1", "item-1-2", "item-3"],
  label: "Tree view",
};
