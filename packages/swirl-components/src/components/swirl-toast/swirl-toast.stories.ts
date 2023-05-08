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
  },
  component: "swirl-toast",
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
