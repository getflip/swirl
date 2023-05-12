import { generateStoryElement } from "../../utils";
import Docs from "./swirl-inline-error.mdx";

export default {
  component: "swirl-inline-error",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlInlineError",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-inline-error", args);

  return element;
};

export const SwirlInlineError = Template.bind({});

SwirlInlineError.args = {
  message: "This is an error message.",
};
