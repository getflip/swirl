import { generateStoryElement } from "../../utils";
import Docs from "./flip-file-viewer.mdx";

export default {
  argTypes: {
    file: {
      control: { type: "text" },
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

  const element = generateStoryElement("flip-file-viewer", args);
  element.style.height = "400px";

  const pdfFile = generateStoryElement("flip-file-viewer", {
    ...args,
    file: "/sample.pdf",
    type: "application/pdf",
  });
  pdfFile.style.height = "600px";

  const videoFile = generateStoryElement("flip-file-viewer", {
    ...args,
    file: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    type: "video/mp4",
  });
  videoFile.style.height = "400px";

  const audioFile = generateStoryElement("flip-file-viewer", {
    ...args,
    file: "https://raw.githubusercontent.com/exaile/exaile-test-files/master/art.mp3",
    type: "audio/mp3",
  });

  const textFile = generateStoryElement("flip-file-viewer", {
    ...args,
    file: "https://www.w3.org/TR/2003/REC-PNG-20031110/iso_8859-1.txt",
    type: "text/plain",
  });
  textFile.style.height = "400px";

  container.append(
    "\n  ",
    element,
    "\n  ",
    pdfFile,
    "\n  ",
    videoFile,
    "\n  ",
    audioFile,
    "\n  ",
    textFile,
    "\n"
  );

  return container;
};

export const FlipFileViewer = Template.bind({});

FlipFileViewer.args = {
  file: "https://picsum.photos/id/1025/1000/1000",
  type: "image/jpg",
};
