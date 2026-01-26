import { generateStoryElement } from "../../utils";
import Docs from "./swirl-icon-wrapper.mdx";

export default {
  component: "swirl-icon-wrapper",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlIconWrapper",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-icon-wrapper", args);
  return element;
};

export const SwirlIconWrapper = Template.bind({});

SwirlIconWrapper.args = {
  icon: "<swirl-icon-edit color='info' size='20'></swirl-icon-edit>",
  backgroundColor: "blueberry",
  size: "xl",
};
