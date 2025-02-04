import { generateStoryElement } from "../../utils";
import Docs from "./swirl-menu-item.mdx";

export default {
  component: "swirl-menu-item",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  tags: ["autodocs"],
  title: "Components/SwirlMenuItem",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-menu-item", args);

  element.innerHTML = `
    <swirl-avatar
      slot="avatar"
      label="Jane Doe"
      size="l"
      src="https://api.dicebear.com/7.x/bottts-neutral/svg?size=144&seed=a"></swirl-avatar>
    <swirl-switch checked hide-label label="Test" slot="suffix"></swirl-switch>
  `;

  return element;
};

export const SwirlMenuItem = Template.bind({});

SwirlMenuItem.args = {
  label: "Label",
};
