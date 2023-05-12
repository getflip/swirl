import { generateStoryElement } from "../../utils";
import Docs from "./swirl-resource-list-item.mdx";

export default {
  component: "swirl-resource-list-item",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
      source: {
        code: `<swirl-resource-list-item
  description="With a description"
  label="This is a resource item"
  media="<swirl-avatar label=&quot;John Doe&quot; src=&quot;https://picsum.photos/id/433/144/144&quot;></swirl-avatar>"
  menu-trigger-id="trigger"
>
</swirl-resource-list-item>

<swirl-popover label="Popover" popover-id="popover" trigger="trigger">
  <swirl-action-list>
    <swirl-action-list-item
      icon="<swirl-icon-mention></swirl-icon-mention>"
      label="Action item 1"
    ></swirl-action-list-item>
    <swirl-action-list-item
      icon="<swirl-icon-mention></swirl-icon-mention>"
      label="Action item 2"
    ></swirl-action-list-item>
  </swirl-action-list>
</swirl-popover>`,
      },
    },
  },
  title: "Components/SwirlResourceListItem",
};

const Template = (args) => {
  const container = document.createElement("div");
  const popover = document.createElement("swirl-popover");
  const element = generateStoryElement("swirl-resource-list-item", args);

  element.innerHTML = `
    <swirl-avatar label="Jane Doe" src="https://avatars.dicebear.com/api/adventurer-neutral/a.svg?size=144" slot="media"></swirl-avatar>
  `;

  container.setAttribute("aria-label", "List");
  container.setAttribute("role", "grid");

  popover.label = "Options";
  popover.popoverId = "popover";
  popover.trigger = "trigger";

  popover.innerHTML = `
    <swirl-action-list>
      <swirl-action-list-item
        icon="<swirl-icon-mention></swirl-icon-mention>"
        label="Action item 1"
      ></swirl-action-list-item>
      <swirl-action-list-item
        icon="<swirl-icon-mention></swirl-icon-mention>"
        label="Action item 2"
      ></swirl-action-list-item>
    </swirl-action-list>
  `;

  container.append(element, popover);

  return container;
};

export const SwirlResourceListItem = Template.bind({});

SwirlResourceListItem.args = {
  description: "With a description",
  label: "This is a resource item",
  menuTriggerId: "trigger",
};
