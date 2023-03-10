import { generateStoryElement } from "../../utils";
import Docs from "./swirl-chip.mdx";

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
  component: "swirl-chip",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlChip",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-chip", args);

  return element;
};

export const SwirlChip = Template.bind({});

SwirlChip.args = {
  label: "Label",
};
