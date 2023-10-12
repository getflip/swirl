import { generateStoryElement } from "../../utils";
import Docs from "./swirl-avatar.mdx";

export default {
  argTypes: {
    badge: {
      description:
        '**Deprecated! Please use the "tool" slot instead.** Visible with default size "m".',
      table: {
        type: {
          detail:
            'e.g. <swirl-badge aria-label="3 new messages" label="3" size="s"></swirl-badge>',
          summary: "swirl-badge",
        },
      },
    },
    badgePosition: {
      description:
        '**Deprecated! Please use the "toolPosition" prop in combination with the "tool" slot instead.**',
      name: "badge-position",
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
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlAvatar",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-avatar", args);

  element.innerHTML = `
  <swirl-badge aria-label="3 new messages" label="3" size="s" slot="tool"></swirl-badge>
`;

  return element;
};

export const SwirlAvatar = Template.bind({});

SwirlAvatar.args = {
  label: "John Doe",
  src: "https://picsum.photos/id/433/144/144",
};
