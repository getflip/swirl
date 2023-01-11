import { generateStoryElement } from "../../utils";
import Docs from "./swirl-separator.mdx";

export default {
  component: "swirl-separator",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlSeparator",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-separator", args);

  return element;
};

export const SwirlSeparator = Template.bind({});

SwirlSeparator.args = {};
