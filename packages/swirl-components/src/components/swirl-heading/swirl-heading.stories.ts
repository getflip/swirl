import { generateStoryElement } from "../../utils";
import Docs from "./swirl-heading.mdx";

export default {
  argTypes: {
    balance: {
      description:
        "Balances the text across lines to prevent visually undesirable results like typographic widows.",
    },
  },
  component: "swirl-heading",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlHeading",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-heading", args);

  return element;
};

export const SwirlHeading = Template.bind({});

SwirlHeading.args = {
  text: "Headline: A line of words printed in large letters as the title of a story",
};
