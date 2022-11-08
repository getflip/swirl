import { generateStoryElement } from "../../utils";
import Docs from "./flip-text-input.mdx";

export default {
  component: "flip-text-input",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipTextInput",
};

const Template = (args) => {
  const formControl = document.createElement("flip-form-control");
  const element = generateStoryElement("flip-text-input", args);

  formControl.setAttribute("label", "Input");
  formControl.append("\n  ", element, "\n");

  return formControl;
};

export const FlipTextInput = Template.bind({});

FlipTextInput.args = {
  value: "Value",
};
