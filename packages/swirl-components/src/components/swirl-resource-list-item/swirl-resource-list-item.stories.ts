import { generateStoryElement } from "../../utils";
import Docs from "./swirl-resource-list-item.mdx";

export default {
  component: "swirl-resource-list-item",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
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

  popover.id = "popover";
  popover.label = "Options";
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

  container.append("\n  ", element, "\n  ", popover, "\n");

  return container;
};

export const SwirlResourceListItem = Template.bind({});

SwirlResourceListItem.args = {
  description: "With a description",
  label: "This is a resource item",
  menuTriggerId: "popover",
};
