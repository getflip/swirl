import { generateStoryElement } from "../../utils";
import Docs from "./swirl-avatar.mdx";

export default {
  argTypes: {
    badge: {
      description: 'Visible with default size "m".',
      table: {
        type: {
          detail:
            'e.g. <flip-badge aria-label="3 new messages" label="3" size="s"></flip-badge>',
          summary: "flip-badge",
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
  component: "flip-avatar",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipAvatar",
};

const Template = (args) => {
  const element = generateStoryElement("flip-avatar", args);

  return element;
};

export const FlipAvatar = Template.bind({});

FlipAvatar.args = {
  badge:
    '<flip-badge aria-label="3 new messages" label="3" size="s"></flip-badge>',
  label: "John Doe",
  src: "https://picsum.photos/id/433/144/144",
};
