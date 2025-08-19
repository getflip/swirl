import { generateStoryElement } from "../../utils";
import Docs from "./swirl-popover.mdx";

export default {
  argTypes: {
    disableScrollLock: {
      description:
        "You should disable the scroll lock for popovers inside modals and dialogs.",
      name: "disable-scroll-lock",
    },
    offset: {
      description:
        "Pass a number to specify the main axis offset. Use an array to provide the main axis and cross axis offsets.",
      control: {
        type: "number",
      },
    },
    padded: {
      description:
        "Adds a small amount of free space to the top and bottom of the popover.",
    },
    returnFocusToTrigger: {
      description:
        "By default, the focus is returned to the trigger element when the popover is closed. Pass false to disable this behavior.",
    },
    trigger: {
      description:
        "**Deprecated! Please use the swirl-popover-trigger component instead.** ID of the trigger element or the trigger DOM element.",
      control: {
        type: "text",
      },
    },
    useContainerWidth: {
      description:
        "Pass true, if you want the popover to have the width of its container. You can also pass a selector string of the container.",
      control: {
        type: "boolean",
      },
      name: "use-container-width",
    },
  },
  component: "swirl-popover",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlPopover",
};

const Template = (args) => {
  const container = document.createElement("div");
  const trigger = document.createElement("swirl-popover-trigger");
  const element = generateStoryElement(
    "swirl-popover",
    args
  ) as HTMLSwirlPopoverElement;

  trigger.setAttribute("swirl-popover", "popover");
  trigger.innerHTML = `
    <swirl-button label="Trigger popover"></swirl-button>
  `;

  element.innerHTML = `
    <swirl-action-list>
      <swirl-action-list-section label="Section 1">
        <swirl-action-list-item icon="<swirl-icon-mention></swirl-icon-mention>" label="Action item 1"></swirl-action-list-item>
        <swirl-action-list-item icon="<swirl-icon-mention></swirl-icon-mention>" label="Action item 2"></swirl-action-list-item>
        <swirl-action-list-item icon="<swirl-icon-mention></swirl-icon-mention>" label="Action item 3"></swirl-action-list-item>
      </swirl-action-list-section>
      <swirl-action-list-section label="Section 2">
        <swirl-action-list-item icon="<swirl-icon-mention></swirl-icon-mention>" label="Action item 1"></swirl-action-list-item>
        <swirl-action-list-item icon="<swirl-icon-mention></swirl-icon-mention>" label="Action item 2"></swirl-action-list-item>
        <swirl-action-list-item icon="<swirl-icon-mention></swirl-icon-mention>" label="Action item 3"></swirl-action-list-item>
      </swirl-action-list-section>
    </swirl-action-list>
  `;

  container.append("\n  ", trigger, "\n  ", element);

  element.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target?.tagName === "SWIRL-ACTION-LIST-ITEM") {
      element.close();
    }
  });

  return container;
};

export const SwirlPopover = Template.bind({});

SwirlPopover.args = {
  id: "popover",
  label: "Popover",
};
