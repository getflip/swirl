import { generateStoryElement } from "../../utils";
import Docs from "./swirl-file-chip.mdx";

export default {
  component: "swirl-file-chip",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlFileChip",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-file-chip", args);

  return element;
};

export const SwirlFileChip = Template.bind({});

SwirlFileChip.args = {
  url: "/sample.pdf",
  name: "sample.pdf",
  type: "application/pdf",
  description: "2.5 MB",
};
