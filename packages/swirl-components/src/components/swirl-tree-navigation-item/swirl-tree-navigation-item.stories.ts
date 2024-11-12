import { generateStoryElement } from "../../utils";
import Docs from "./swirl-tree-navigation-item.mdx";

export default {
  argTypes: {
    icon: {
      table: {
        type: {
          detail: "e.g. <swirl-icon-close></swirl-icon-close>",
          summary: "swirl-icon-*",
        },
      },
    },
  },
  component: "swirl-tree-navigation-item",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Admin/SwirlTreeNavigationItem",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-tree-navigation-item", args);

  element.innerHTML = `<swirl-tree-navigation-item icon="<swirl-icon-arrow-right-small></swirl-icon-arrow-right-small>" label="Label"></swirl-tree-navigation-item>`;

  return element;
};

export const SwirlTreeNavigationItem = Template.bind({});

SwirlTreeNavigationItem.args = {
  icon: "<swirl-icon-person></swirl-icon-person>",
  label: "Label",
};
