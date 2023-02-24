import { generateStoryElement } from "../../utils";
import Docs from "./swirl-shell-navigation-item.mdx";

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
  component: "swirl-shell-navigation-item",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlShellNavigationItem",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-shell-navigation-item", args);

  return element;
};

export const SwirlShellNavigationItem = Template.bind({});

SwirlShellNavigationItem.args = {
  icon: "<swirl-icon-chat-bubble></swirl-icon-chat-bubble>",
  label: "Label",
};
