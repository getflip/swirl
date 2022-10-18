import { generateStoryElement } from "../../utils";
import Docs from "./flip-progress-indicator.mdx";

export default {
  component: "flip-progress-indicator",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipProgressIndicator",
};

const Template = (args) => {
  const element = generateStoryElement("flip-progress-indicator", args);

  return element;
};

export const FlipProgressIndicator = Template.bind({});

FlipProgressIndicator.args = {
  label: "Upload progress",
  value: 70,
};
