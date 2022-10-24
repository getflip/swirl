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
  const container = document.createElement("flip-stack");
  container.spacing = "24";

  const element = generateStoryElement(
    "flip-file-viewer",
    args
  ) as HTMLFlipFileViewerElement;

  element.style.height = "clamp(400px, 90vh, 700px)";

  const tools = document.createElement("flip-stack");
  tools.orientation = "horizontal";
  tools.spacing = "8";

  const printButton = document.createElement("flip-button");
  printButton.setAttribute("label", "Print");
  printButton.addEventListener("click", () => {
    element.print();
  });

  const downloadButton = document.createElement("flip-button");
  downloadButton.setAttribute("label", "Download");
  downloadButton.addEventListener("click", () => {
    element.download();
  });

  if (args.type === "application/pdf") {
    tools.append("\n    ", printButton, "\n    ", downloadButton, "\n  ");
  } else {
    tools.append("\n    ", downloadButton, "\n  ");
  }

  container.append("\n  ", element, "\n  ", tools, "\n");

  return container;
};

export const FlipFileViewer = Template.bind({});

FlipFileViewer.args = {
  file: "/sample.pdf",
  type: "application/pdf",
};
