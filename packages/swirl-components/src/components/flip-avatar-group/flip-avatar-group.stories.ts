import { generateStoryElement } from "../../utils";
import Docs from "./flip-avatar-group.mdx";

export default {
  argTypes: {
    badge: {
      description: "Only pass a single <flip-badge /> element as value.",
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
