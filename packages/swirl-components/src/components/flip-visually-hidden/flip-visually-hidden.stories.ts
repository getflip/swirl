import { generateStoryElement } from '../../utils';
// @ts-ignore
import Docs from './flip-visually-hidden.mdx';

export default {
  component: "flip-visually-hidden",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipVisuallyHidden",
};

const Template = (args) => {
  const element = generateStoryElement("flip-visually-hidden", args, "Content");

  return element;
};

export const FlipVisuallyHidden = Template.bind({});

FlipVisuallyHidden.args = {};
