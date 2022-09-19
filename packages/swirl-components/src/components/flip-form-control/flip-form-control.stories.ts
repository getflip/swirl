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

  // TODO: add a flip form element
  element.innerHTML = `
    <flip-radio-group aria-label="Radio group">
      <flip-radio input-id="radio-1" input-name="radio" label="Radio button #1" value="1"></flip-radio>
      <flip-radio input-id="radio-2" input-name="radio" label="Radio button #2" value="2"></flip-radio>
      <flip-radio input-id="radio-3" input-name="radio" label="Radio button #3" value="3"></flip-radio>
    </flip-radio-group>
  `;

  return element;
};

export const FlipFormControl = Template.bind({});

FlipFormControl.args = {
  description: "Optional description of the control.",
  label: "Form Control Label",
};
