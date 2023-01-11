import { generateStoryElement } from "../../utils";
import Docs from "./swirl-separator.mdx";

export default {
  component: "flip-separator",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipSeparator",
};

const Template = (args) => {
  const element = generateStoryElement("flip-separator", args);

  return element;
};

export const FlipSeparator = Template.bind({});

FlipSeparator.args = {};
