import { generateStoryElement } from "../../utils";
import Docs from "./swirl-popover-trigger.mdx";

export default {
  argTypes: {
    swirlPopover: {
      description:
        "ID of a popover element or a reference to a DOM element of type HTMLSwirlPopoverElement.",
      control: {
        type: "text",
      },
    },
  },
  component: "swirl-popover-trigger",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlPopoverTrigger",
};

const Template = (args) => {
  const container = document.createElement("swirl-stack");
  const element = generateStoryElement("swirl-popover-trigger", args);
  const secondTrigger = generateStoryElement("swirl-popover-trigger", args);
  const popover = document.createElement("swirl-popover");

  container.orientation = "horizontal";
  container.spacing = "16";

  popover.label = "Popover";
  popover.id = "popover";
  popover.placement = "bottom-start";

  popover.innerHTML = `
    <swirl-box padding="12">
      <swirl-text size="sm">Popover</swirl-text>
    </swirl-box>
  `;

  element.innerHTML = `
    <swirl-button label="Trigger element" variant="flat"></swirl-button>
  `;

  secondTrigger.innerHTML = `
    <swirl-button label="Second trigger, same popover" variant="flat"></swirl-button>
  `;

  container.append(
    "\n  ",
    element,
    "\n  ",
    secondTrigger,
    "\n  ",
    popover,
    "\n"
  );

  return container;
};

export const SwirlPopoverTrigger = Template.bind({});

SwirlPopoverTrigger.args = {
  swirlPopover: "popover",
};
