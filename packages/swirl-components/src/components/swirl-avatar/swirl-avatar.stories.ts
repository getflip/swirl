import { generateStoryElement } from "../../utils";
import Docs from "./swirl-avatar.mdx";

export default {
  argTypes: {
    badge: {
      description: 'Visible with default size "m".',
      table: {
        type: {
          detail:
            'e.g. <swirl-badge aria-label="3 new messages" label="3" size="s"></swirl-badge>',
          summary: "swirl-badge",
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
  component: "swirl-avatar",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlAvatar",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-avatar", args);

  return element;
};

export const SwirlAvatar = Template.bind({});

SwirlAvatar.args = {
  badge:
    '<swirl-badge aria-label="3 new messages" label="3" size="s"></swirl-badge>',
  label: "John Doe",
  src: "https://picsum.photos/id/433/144/144",
};
