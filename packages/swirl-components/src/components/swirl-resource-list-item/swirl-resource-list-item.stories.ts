import { generateStoryElement } from "../../utils";
import Docs from "./swirl-resource-list-item.mdx";

export default {
  argTypes: {
    menuTriggerId: {
      description:
        "**Deprecated!** Please use the `control` slot to render an item control.",
    },
    menuTriggerLabel: {
      description:
        "**Deprecated!** Please use the `control` slot to render an item control.",
    },
  },
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
  const list = document.createElement("div");
  const popover = document.createElement("swirl-popover");
  const control = document.createElement("span");
  const element = generateStoryElement("swirl-resource-list-item", args);

  element.innerHTML = `
      <swirl-avatar
        slot="media"
        label="Jane Doe"
        size="l"
        src="https://api.dicebear.com/7.x/bottts-neutral/svg?size=144&seed=a"></swirl-avatar>

      <swirl-stack slot="badges" align="center" orientation="horizontal" spacing="8">
        <swirl-icon-notifications-off size="16"></swirl-icon-notifications-off>
        <swirl-badge label="1" size="xs"></swirl-badge>
      </swirl-stack>

  `;

  control.slot = "control";
  control.innerHTML = `
        <swirl-popover-trigger swirl-popover="popover">
          <swirl-button
            hide-label
            icon="<swirl-icon-more-horizontal></swirl-icon-more-horizontal>"
            label="Show menu"
            size="s"
            variant="flat"></swirl-button>
        </swirl-popover-trigger>
      `;

  list.setAttribute("aria-label", "List");
  list.setAttribute("role", "grid");

  popover.id = "popover";
  popover.animation = "scale-in-y";
  popover.label = "Options";
  popover.placement = "bottom-end";

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

  element.append("    ", control, "\n    ");
  list.append("\n    ", element, "\n  ");
  container.append("\n  ", list, "\n\n  ", popover, "\n");

  return container;
};

export const SwirlResourceListItem = Template.bind({});

SwirlResourceListItem.args = {
  description: "With a description",
  label: "This is a resource item",
  meta: "Today",
};
