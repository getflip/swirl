import { generateStoryElement } from "../../utils";
import Docs from "./swirl-tag.mdx";

export default {
  component: "flip-tag",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipTag",
};

const Template = (args) => {
  const element = generateStoryElement("flip-tag", args);

  return element;
};

export const FlipTag = Template.bind({});

FlipTag.args = {
  label: "Label",
  removable: true,
};
