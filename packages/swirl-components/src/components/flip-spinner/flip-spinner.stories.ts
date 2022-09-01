import { generateStoryElement } from "../../utils";
import Docs from "./flip-spinner.mdx";

export default {
  component: "flip-spinner",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipSpinner",
};

const Template = (args) => {
  const element = generateStoryElement("flip-spinner", args);

  return element;
};

export const FlipSpinner = Template.bind({});

FlipSpinner.args = {
  label: "Loading messages …",
};
