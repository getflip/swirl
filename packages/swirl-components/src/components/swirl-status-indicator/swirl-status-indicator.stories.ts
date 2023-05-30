import { generateStoryElement } from "../../utils";
import Docs from "./swirl-status-indicator.mdx";

export default {
  component: "swirl-status-indicator",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlStatusIndicator",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-status-indicator", args);

  return element;
};

export const SwirlStatusIndicator = Template.bind({});

SwirlStatusIndicator.args = {
  intent: "success",
  label: "Label",
};
