import { generateStoryElement } from "../../utils";
import Docs from "./flip-chip.mdx";

export default {
  component: "flip-chip",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipChip",
};

const Template = (args) => {
  const element = generateStoryElement("flip-chip", args);

  return element;
};

export const FlipChip = Template.bind({});

FlipChip.args = {
  label: "Label",
};
