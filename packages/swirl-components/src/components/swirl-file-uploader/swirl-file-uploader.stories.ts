import { generateStoryElement } from "../../utils";
import Docs from "./swirl-file-uploader.mdx";

export default {
  component: "swirl-file-uploader",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlFileUploader",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-file-uploader", args);

  return element;
};

export const SwirlFileUploader = Template.bind({});

SwirlFileUploader.args = {
  accept: "image/*",
  description: "Only image files are allowed.",
  inputId: "file-upload",
  inputName: "file-upload",
  label: "Label",
};
