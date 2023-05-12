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

  return element;
};

export const SwirlMenuItem = Template.bind({});

SwirlMenuItem.args = {
  label: "Label",
};
