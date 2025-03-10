import { generateStoryElement } from "../../utils";
import Docs from "./swirl-menu.mdx";

export default {
  component: "swirl-menu",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  tags: ["autodocs"],
  title: "Components/SwirlMenu",
};

const Template = (args) => {
  const container = document.createElement("div");
  const trigger = document.createElement("swirl-popover-trigger");
  const popover = document.createElement("swirl-popover");
  const element = generateStoryElement("swirl-menu", args);

  trigger.swirlPopover = "menu-popover";
  trigger.innerHTML = `
    <swirl-button label="Open menu"></swirl-button>
  `;

  popover.fullscreenBottomSheet = true;
  popover.id = "menu-popover";
  popover.label = "Menu popover";
  popover.trigger = "trigger";

  element.innerHTML = `
      <swirl-menu-item icon="<swirl-icon-copy></swirl-icon-copy>" label="Duplicate"></swirl-menu-item>
      <swirl-menu-item icon="<swirl-icon-delete></swirl-icon-delete>" intent="critical" label="Delete"></swirl-menu-item>
      <swirl-menu-item icon="<swirl-icon-ai></swirl-icon-ai>" label="AI features">
        <swirl-menu label="AI features">
          <swirl-menu-item label="Generate summary"></swirl-menu-item>
          <swirl-menu-item label="Simplify"></swirl-menu-item>
          <swirl-menu-item disabled label="Check spelling"></swirl-menu-item>
        </swirl-menu>
      </swirl-menu-item>
      <swirl-menu-item icon="<swirl-icon-edit></swirl-icon-edit>" label="Colors">
        <swirl-menu label="Colors menu">
          <swirl-menu-item label="Text color">
            <swirl-menu label="Text color menu" value="blue" variant="selection">
              <swirl-menu-item label="Red" value="red"></swirl-menu-item>
              <swirl-menu-item label="Blue" value="blue"></swirl-menu-item>
              <swirl-menu-item label="Green" value="green"></swirl-menu-item>
            </swirl-menu>
          </swirl-menu-item>
          <swirl-menu-item label="Background color">
            <swirl-menu label="Background color menu" value="light" variant="selection">
              <swirl-menu-item label="Light" value="light"></swirl-menu-item>
              <swirl-menu-item label="Dark" value="dark"></swirl-menu-item>
            </swirl-menu>
          </swirl-menu-item>
        </swirl-menu>
      </swirl-menu-item>
    `;

  popover.append("\n    ", element, "\n  ");
  container.append("\n  ", trigger, "\n  ", popover, "\n");

  return container;
};

export const SwirlMenu = Template.bind({});

SwirlMenu.args = {
  label: "Label",
};
