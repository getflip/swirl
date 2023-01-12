import { generateStoryElement } from "../../utils";
import Docs from "./swirl-tag.mdx";

export default {
  component: "swirl-tag",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlTag",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-tag", args);

  return element;
};

export const SwirlTag = Template.bind({});

SwirlTag.args = {
  label: "Label",
  removable: true,
};
