import { generateStoryElement } from "../../utils";
import Docs from "./flip-heading.mdx";

export default {
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
  text: "Heading",
};
