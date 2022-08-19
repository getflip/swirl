import { generateStoryElement } from '../../utils';
// @ts-ignore
import Docs from './flip-badge.mdx';

export default {
  component: "flip-badge",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipBadge",
};

const Template = (args) => {
  const element = generateStoryElement("flip-badge", args);

  return element;
};

export const FlipBadge = Template.bind({});

FlipBadge.args = {
  "aria-label": "3 new messages",
  label: "3",
};
