import { generateStoryElement } from "../../utils";
import Docs from "./swirl-avatar-group.mdx";

export default {
  argTypes: {
    badge: {
      table: {
        type: {
          detail:
            'e.g. <swirl-badge aria-label="3 new messages" label="3" size="s"><swirl-badge>',
          summary: "swirl-badge",
        },
      },
    },
  },
  component: "swirl-avatar-group",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlAvatarGroup",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-avatar-group", args);

  element.innerHTML = `
    <swirl-avatar label="Jane Doe" src="https://avatars.dicebear.com/api/adventurer-neutral/a.svg?size=144" size="s"></swirl-avatar>
    <swirl-avatar label="John Doe" src="https://avatars.dicebear.com/api/adventurer-neutral/b.svg?size=144" size="s"></swirl-avatar>
  `;

  return element;
};

export const SwirlAvatarGroup = Template.bind({});

SwirlAvatarGroup.args = {
  badge: `<swirl-badge aria-label="3 new messages" label="3"></swirl-badge>`,
};
