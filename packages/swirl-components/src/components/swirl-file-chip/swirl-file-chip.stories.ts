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

  element.addEventListener("previewClick", () => {
    console.log("Preview clicked");
  });

  element.addEventListener("downloadClick", () => {
    console.log("Download clicked");
  });

  return element;
};

export const SwirlChip = Template.bind({});

SwirlChip.args = {
  url: "/sample.pdf",
  name: "sample.pdf",
  type: "application/pdf",
  description: "2.5 MB",
};
