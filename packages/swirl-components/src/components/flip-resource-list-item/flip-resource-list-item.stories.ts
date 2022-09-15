import { generateStoryElement } from "../../utils";
import Docs from "./flip-resource-list-item.mdx";

export default {
  component: "flip-resource-list-item",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipResourceListItem",
};

const Template = (args) => {
  const element = generateStoryElement("flip-resource-list-item", args);

  element.innerHTML = `
    <flip-avatar label="John Doe" slot="media" src="https://picsum.photos/id/433/144/144"></flip-avatar>

    <flip-action-list slot="menu">
      <flip-action-list-section label="Section 1">
        <flip-action-list-item
          icon="<flip-icon-mention></flip-icon-mention>"
          label="Action item 1"
        ></flip-action-list-item>
        <flip-action-list-item
          icon="<flip-icon-mention></flip-icon-mention>"
          label="Action item 2"
        ></flip-action-list-item>
        <flip-action-list-item
          icon="<flip-icon-mention></flip-icon-mention>"
          label="Action item 3"
        ></flip-action-list-item>
      </flip-action-list-section>
      <flip-action-list-section label="Section 2">
        <flip-action-list-item
          icon="<flip-icon-mention></flip-icon-mention>"
          label="Action item 1"
        ></flip-action-list-item>
        <flip-action-list-item
          icon="<flip-icon-mention></flip-icon-mention>"
          label="Action item 2"
        ></flip-action-list-item>
        <flip-action-list-item
          icon="<flip-icon-mention></flip-icon-mention>"
          label="Action item 3"
        ></flip-action-list-item>
      </flip-action-list-section>
    </flip-action-list>
  `;

  return element;
};

export const FlipResourceListItem = Template.bind({});

FlipResourceListItem.args = {
  description: "With a description",
  label: "This is a resource item",
  meta: "Yesterday",
};
