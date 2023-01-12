import { generateStoryElement } from "../../utils";
// @ts-ignore
import Docs from "./swirl-button.mdx";

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
  component: "swirl-button",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlButton",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-button", args);

  return element;
};

export const SwirlButton = Template.bind({});

SwirlButton.args = {
  icon: "<swirl-icon-add></swirl-icon-add>",
  label: "Label",
};
