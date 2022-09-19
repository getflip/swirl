import { generateStoryElement } from "../../utils";
import Docs from "./flip-form-control.mdx";

export default {
  component: "flip-form-control",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipFormControl",
};

const Template = (args) => {
  const element = generateStoryElement("flip-form-control", args);

  element.innerHTML = `<flip-text-input clearable prefix-label="$" type="number"></flip-text-input>`;

  return element;
};

export const FlipFormControl = Template.bind({});

FlipFormControl.args = {
  description: "Optional description of the control.",
  label: "Form Control Label",
};
