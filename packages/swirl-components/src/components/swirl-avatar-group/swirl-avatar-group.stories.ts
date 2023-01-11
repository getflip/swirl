import { generateStoryElement } from "../../utils";
import Docs from "./swirl-avatar-group.mdx";

export default {
  argTypes: {
    badge: {
      table: {
        type: {
          detail:
            'e.g. <flip-badge aria-label="3 new messages" label="3" size="s"><flip-badge>',
          summary: "flip-badge",
        },
      },
    },
  },
  component: "flip-avatar-group",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipAvatarGroup",
};

const Template = (args) => {
  const element = generateStoryElement("flip-avatar-group", args);

  element.innerHTML = `
    <flip-avatar label="Jane Doe" src="https://avatars.dicebear.com/api/adventurer-neutral/a.svg?size=144" size="s"></flip-avatar>
    <flip-avatar label="John Doe" src="https://avatars.dicebear.com/api/adventurer-neutral/b.svg?size=144" size="s"></flip-avatar>
  `;

  return element;
};

export const FlipAvatarGroup = Template.bind({});

FlipAvatarGroup.args = {
  badge: `<flip-badge aria-label="3 new messages" label="3"></flip-badge>`,
};
