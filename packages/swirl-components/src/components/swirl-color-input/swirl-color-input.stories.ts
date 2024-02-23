import { addAttributesToElement, generateStoryElement } from "../../utils";
import Docs from "./swirl-color-input.mdx";

export default {
  component: "swirl-color-input",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlColorInput",
};

const Template = (args) => {
  const formControl = document.createElement("swirl-form-control");
  const element = generateStoryElement("swirl-color-input", args);

  addAttributesToElement(formControl, { ...args, label: "Color input" });
  formControl.append("\n  ", element, "\n");

  return formControl;
};

export const SwirlColorInput = Template.bind({});

SwirlColorInput.args = {};
