import { generateStoryElement } from "../../utils";
import Docs from "./swirl-menu.mdx";

export default {
  component: "swirl-menu",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlMenu",
};

const Template = (args) => {
  const container = document.createElement("div");
  const trigger = document.createElement("swirl-button");
  const popover = document.createElement("swirl-popover");
  const element = generateStoryElement("swirl-menu", args);

  trigger.id = "trigger";
  trigger.label = "Open menu";

  popover.fullscreenBottomSheet = true;
  popover.label = "Menu popover";
  popover.popoverId = "menu-popover";
  popover.trigger = "trigger";

  element.innerHTML = `
    <swirl-menu-item icon="<swirl-icon-copy></swirl-icon-copy>" label="Duplicate"></swirl-menu-item>
    <swirl-menu-item icon="<swirl-icon-delete></swirl-icon-delete>" intent="critical" label="Delete"></swirl-menu-item>
    <swirl-menu-item icon="<swirl-icon-ai></swirl-icon-ai>" label="AI features">
      <swirl-menu label="AI features">
        <swirl-menu-item label="Generate summary"></swirl-menu-item>
        <swirl-menu-item label="Simplify"></swirl-menu-item>
        <swirl-menu-item label="Check spelling"></swirl-menu-item>
      </swirl-menu>
    </swirl-menu-item>
    <swirl-menu-item icon="<swirl-icon-edit></swirl-icon-edit>" label="Colors">
      <swirl-menu label="Colors menu" selection">
        <swirl-menu-item label="Text color">
          <swirl-menu label="Text color menu">
            <swirl-menu-item label="Red"></swirl-menu-item>
            <swirl-menu-item label="Blue"></swirl-menu-item>
            <swirl-menu-item label="Green"></swirl-menu-item>
          </swirl-menu>
        </swirl-menu-item>
        <swirl-menu-item label="Background color">
          <swirl-menu label="Background color menu">
            <swirl-menu-item label="Light"></swirl-menu-item>
            <swirl-menu-item label="Dark"></swirl-menu-item>
          </swirl-menu>
        </swirl-menu-item>
      </swirl-menu>
    </swirl-menu-item>
  `;

  popover.append(element);
  container.append(trigger, popover);

  return container;
};

export const SwirlMenu = Template.bind({});

SwirlMenu.args = {
  label: "Label",
};
