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
    <swirl-avatar label="Jane Doe" src="https://api.dicebear.com/7.x/bottts-neutral/svg?size=144&seed=a" size="s"></swirl-avatar>
    <swirl-avatar label="John Doe" src="https://api.dicebear.com/7.x/bottts-neutral/svg?size=144&seed=b" size="s"></swirl-avatar>
  `;

  return element;
};

export const SwirlAvatarGroup = Template.bind({});

SwirlAvatarGroup.args = {
  badge: `<swirl-badge aria-label="3 new messages" label="3"></swirl-badge>`,
};

const TemplateWithHorizontalLayout = (args) => {
  const element = generateStoryElement("swirl-avatar-group", args);

  element.innerHTML = `
    <swirl-avatar label="Jane Doe" src="https://api.dicebear.com/7.x/bottts-neutral/svg?size=144&seed=a" size="3xs"></swirl-avatar>
    <swirl-tooltip content="Test">
      <swirl-avatar label="John Doe" src="https://api.dicebear.com/7.x/bottts-neutral/svg?size=144&seed=b" size="3xs"></swirl-avatar>
    </swirl-tooltip>
    <swirl-avatar label="John Doe" src="https://api.dicebear.com/7.x/bottts-neutral/svg?size=144&seed=c" size="3xs"></swirl-avatar>
  `;

  return element;
};

export const WithHorizontalLayout = TemplateWithHorizontalLayout.bind({});

WithHorizontalLayout.args = {
  layout: "horizontal",
};
