import { generateStoryElement } from "../../utils";
import Docs from "./swirl-toast.mdx";

export default {
  argTypes: {
    icon: {
      table: {
        type: {
          detail: "e.g. <swirl-icon-mail></swirl-icon-mail>",
          summary: "swirl-icon-*",
        },
      },
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

  return element;
};

export const SwirlToast = Template.bind({});

SwirlToast.args = {
  content: `This is toast text with multiple lines. Try to keep the info as short as possible.`,
  icon: `<swirl-icon-mail></swirl-icon-mail>`,
};
