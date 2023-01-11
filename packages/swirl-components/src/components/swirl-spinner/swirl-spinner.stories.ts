import { generateStoryElement } from "../../utils";
import Docs from "./swirl-spinner.mdx";

export default {
  component: "swirl-spinner",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlSpinner",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-spinner", args);

  return element;
};

export const SwirlSpinner = Template.bind({});

SwirlSpinner.args = {
  label: "Loading messages …",
};
