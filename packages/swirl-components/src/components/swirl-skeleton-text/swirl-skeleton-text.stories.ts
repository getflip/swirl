import { generateStoryElement } from "../../utils";
import Docs from "./swirl-skeleton-text.mdx";

export default {
  component: "swirl-skeleton-text",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlSkeletonText",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-skeleton-text", args);

  return element;
};

export const SwirlSkeletonText = Template.bind({});

SwirlSkeletonText.args = {
  lines: 4,
};
