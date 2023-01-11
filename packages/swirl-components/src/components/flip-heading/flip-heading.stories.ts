import { generateStoryElement } from "../../utils";
import Docs from "./flip-heading.mdx";

export default {
  argTypes: {
    balance: {
      description:
        "Balances the text across lines to prevent visually undesirable results like typographic widows.",
    },
  },
  component: "flip-heading",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipHeading",
};

const Template = (args) => {
  const element = generateStoryElement("flip-heading", args);

  return element;
};

export const FlipHeading = Template.bind({});

FlipHeading.args = {
  text: "Headline: A line of words printed in large letters as the title of a story",
};
