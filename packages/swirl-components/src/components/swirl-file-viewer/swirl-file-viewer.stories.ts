import { generateStoryElement } from "../../utils";
import Docs from "./swirl-file-viewer.mdx";

export default {
  argTypes: {
    autoplay: {
      description: "Applicable to audio/video only.",
    },
    file: {
      control: { type: "text" },
    },
    zoom: {
      control: { type: "text" },
      description: "Applicable to PDFs only.",
    },
    skipNativeDownload: {
      control: { type: "boolean" },
      description:
        "Use in conjuction with the `downloadStart` event to handle downloads manually.",
    },
  },
  component: "swirl-file-viewer",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlFileViewer",
};

const Template = (args) => {
  const container = document.createElement("swirl-stack");
  container.spacing = "24";

  const element = generateStoryElement(
    "swirl-file-viewer",
    args
  ) as HTMLSwirlFileViewerElement;

  element.style.height = "clamp(400px, 90vh, 700px)";

  const tools = document.createElement("swirl-stack");
  tools.orientation = "horizontal";
  tools.spacing = "8";

  const printButton = document.createElement("swirl-button");
  printButton.setAttribute("label", "Print");
  printButton.addEventListener("click", () => {
    element.print();
  });

  const downloadButton = document.createElement("swirl-button");
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

export const SwirlFileViewer = Template.bind({});

SwirlFileViewer.args = {
  file: "/sample.pdf",
  type: "application/pdf",
};
