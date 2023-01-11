import { generateStoryElement } from "../../utils";
import Docs from "./swirl-heading.mdx";

export default {
  component: "swirl-heading",
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
  text: "Heading",
};
