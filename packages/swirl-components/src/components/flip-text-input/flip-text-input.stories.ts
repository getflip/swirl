import { generateStoryElement } from "../../utils";
import Docs from "./flip-text-input.mdx";

export default {
  component: "flip-text-input",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipTextInput",
};

const Template = (args) => {
  const element = generateStoryElement("flip-text-input", args);

  return element;
};

export const FlipTextInput = Template.bind({});

FlipTextInput.args = {
  value: "Value",
};
