import { generateStoryElement } from "../../utils";
import Docs from "./flip-resource-list-item.mdx";

export default {
  component: "flip-resource-list-item",
  parameters: {
    docs: {
      page: Docs,
      source: {
        code: `<flip-resource-list-item
  description="With a description"
  label="This is a resource item"
  media="<flip-avatar label=&quot;John Doe&quot; src=&quot;https://picsum.photos/id/433/144/144&quot;></flip-avatar>"
  menu-trigger-id="trigger"
>
</flip-resource-list-item>

<flip-popover label="Popover" popover-id="popover" trigger="trigger">
  <flip-action-list>
    <flip-action-list-item
      icon="<flip-icon-mention></flip-icon-mention>"
      label="Action item 1"
    ></flip-action-list-item>
    <flip-action-list-item
      icon="<flip-icon-mention></flip-icon-mention>"
      label="Action item 2"
    ></flip-action-list-item>
  </flip-action-list>
</flip-popover>`,
      },
    },
  },
  title: "Components/FlipResourceListItem",
};

const Template = (args) => {
  const container = document.createElement("div");
  const popover = document.createElement("flip-popover");
  const element = generateStoryElement("flip-resource-list-item", args);

  element.innerHTML = `
    <flip-avatar label="John Doe" slot="media" src="https://picsum.photos/id/433/144/144"></flip-avatar>
  `;

  popover.label = "Options";
  popover.popoverId = "popover";
  popover.trigger = "trigger";

  popover.innerHTML = `
    <flip-action-list>
      <flip-action-list-item
        icon="<flip-icon-mention></flip-icon-mention>"
        label="Action item 1"
      ></flip-action-list-item>
      <flip-action-list-item
        icon="<flip-icon-mention></flip-icon-mention>"
        label="Action item 2"
      ></flip-action-list-item>
    </flip-action-list>
  `;

  container.append(element, popover);

  return container;
};

export const FlipResourceListItem = Template.bind({});

FlipResourceListItem.args = {
  description: "With a description",
  label: "This is a resource item",
  media: `<flip-avatar label="John Doe" src="https://picsum.photos/id/433/144/144"></flip-avatar>`,
  menuTriggerId: "trigger",
};
