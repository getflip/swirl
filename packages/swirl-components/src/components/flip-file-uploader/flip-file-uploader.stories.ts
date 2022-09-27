import { generateStoryElement } from "../../utils";
import Docs from "./flip-file-uploader.mdx";

export default {
  component: "flip-file-uploader",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipFileUploader",
};

const Template = (args) => {
  const element = generateStoryElement("flip-file-uploader", args);

  return element;
};

export const FlipFileUploader = Template.bind({});

FlipFileUploader.args = {
  accept: "image/*",
  description: "Only image files are allowed.",
  inputId: "file-upload",
  inputName: "file-upload",
  label: "Label",
};
