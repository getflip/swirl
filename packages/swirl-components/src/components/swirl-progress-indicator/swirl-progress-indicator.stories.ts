import { generateStoryElement } from "../../utils";
import Docs from "./swirl-progress-indicator.mdx";

export default {
  component: "swirl-progress-indicator",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlProgressIndicator",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-progress-indicator", args);

  return element;
};

export const SwirlProgressIndicator = Template.bind({});

SwirlProgressIndicator.args = {
  label: "Upload progress",
  value: 70,
};
