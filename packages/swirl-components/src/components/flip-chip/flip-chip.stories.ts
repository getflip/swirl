import { generateStoryElement } from "../../utils";
import Docs from "./flip-chip.mdx";

export default {
  argTypes: {
    avatar: {
      table: {
        type: {
          detail:
            'e.g. <flip-avatar label="John Doe" src="https://picsum.photos/id/433/144/144"></flip-avatar>',
          summary: "flip-avatar",
        },
      },
    },
    icon: {
      table: {
        type: {
          detail: "e.g. <flip-icon-close></flip-icon-close>",
          summary: "flip-icon-*",
        },
      },
    },
  },
  component: "flip-chip",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipChip",
};

const Template = (args) => {
  const element = generateStoryElement("flip-chip", args);

  return element;
};

export const FlipChip = Template.bind({});

FlipChip.args = {
  label: "Label",
};
