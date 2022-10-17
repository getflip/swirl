import { generateStoryElement } from "../../utils";
import Docs from "./flip-file-viewer.mdx";

export default {
  argTypes: {
    file: {
      control: { type: "text" },
    },
    zoom: {
      control: { type: "text" },
      description: "Applicable to PDFs only.",
    },
  },
  component: "flip-file-viewer",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipFileViewer",
};

const Template = (args) => {
  const element = generateStoryElement("flip-file-viewer", args);

  element.style.height = "clamp(400px, 90vh, 700px)";

  return element;
};

export const FlipFileViewer = Template.bind({});

FlipFileViewer.args = {
  file: "/sample.pdf",
  type: "application/pdf",
};
