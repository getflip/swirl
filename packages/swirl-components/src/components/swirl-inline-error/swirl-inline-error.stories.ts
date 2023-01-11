import { generateStoryElement } from "../../utils";
import Docs from "./swirl-inline-error.mdx";

export default {
  component: "flip-inline-error",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipInlineError",
};

const Template = (args) => {
  const element = generateStoryElement("flip-inline-error", args);

  return element;
};

export const FlipInlineError = Template.bind({});

FlipInlineError.args = {
  message: "This is an error message.",
};
