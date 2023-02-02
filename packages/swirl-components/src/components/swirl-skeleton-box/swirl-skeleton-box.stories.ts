import { generateStoryElement } from "../../utils";
import Docs from "./swirl-skeleton-box.mdx";

export default {
  component: "swirl-skeleton-box",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlSkeletonBox",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-skeleton-box", args);

  return element;
};

export const SwirlSkeletonBox = Template.bind({});

SwirlSkeletonBox.args = {
  aspectRatio: "1/0.5",
  width: "50%",
};
