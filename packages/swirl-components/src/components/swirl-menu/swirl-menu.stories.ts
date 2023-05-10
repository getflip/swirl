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
    <swirl-menu-item label="1"></swirl-menu-item>
    <swirl-menu-item label="2">
      <swirl-menu label="Sub menu of 2">
        <swirl-menu-item label="3"></swirl-menu-item>
        <swirl-menu-item label="4">
          <swirl-menu label="Sub sub menu of 2">
            <swirl-menu-item label="5"></swirl-menu-item>
          </swirl-menu>
        </swirl-menu-item>
        <swirl-menu-item label="6"></swirl-menu-item>
      </swirl-menu>
    </swirl-menu-item>
    <swirl-menu-item label="7">
      <swirl-menu label="Sub menu of 7">
        <swirl-menu-item label="8"></swirl-menu-item>
        <swirl-menu-item label="9">
          <swirl-menu label="Sub sub menu of 7">
            <swirl-menu-item label="10"></swirl-menu-item>
          </swirl-menu>
        </swirl-menu-item>
        <swirl-menu-item label="11">
          <swirl-menu label="Sub sub menu of 7">
            <swirl-menu-item label="12"></swirl-menu-item>
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
