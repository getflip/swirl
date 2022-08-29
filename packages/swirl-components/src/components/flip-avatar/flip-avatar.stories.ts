import { generateStoryElement } from "../../utils";
import Docs from "./flip-avatar.mdx";

export default {
  argTypes: {
    badge: {
      description:
        'Visible with default size "m". Only pass a single <flip-badge /> element as value.',
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
