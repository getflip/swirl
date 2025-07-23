import { generateStoryElement } from "../../utils";
import Docs from "./swirl-toast.mdx";

export default {
  argTypes: {
    content: {
      description: "Deprecated. Use the component slot instead.",
    },
    icon: {
      table: {
        type: {
          detail: "e.g. <swirl-icon-mail></swirl-icon-mail>",
          summary: "swirl-icon-*",
        },
      },
    },
    duration: {
      description:
        "When set to Infinity, the toast will remain visible until explicitly dismissed",
    },
  },
  component: "swirl-toast",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlToast",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-toast", args);

  element.innerHTML = `This is toast text with multiple lines. Try to keep the info as short as possible.`;

  return element;
};

export const SwirlToast = Template.bind({});

SwirlToast.args = {
  icon: `<swirl-icon-mail></swirl-icon-mail>`,
};
