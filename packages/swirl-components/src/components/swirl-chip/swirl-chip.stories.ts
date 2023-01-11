import { generateStoryElement } from "../../utils";
import Docs from "./swirl-chip.mdx";

export default {
  argTypes: {
    avatar: {
      table: {
        type: {
          detail:
            'e.g. <swirl-avatar label="John Doe" src="https://picsum.photos/id/433/144/144"></swirl-avatar>',
          summary: "swirl-avatar",
        },
      },
    },
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
