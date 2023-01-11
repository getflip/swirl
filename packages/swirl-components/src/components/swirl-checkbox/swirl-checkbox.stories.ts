import { generateStoryElement } from "../../utils";
import Docs from "./swirl-checkbox.mdx";

export default {
  argTypes: {
    checked: {
      control: "radio",
      options: [false, "indeterminate", true],
    },
  },
  component: "flip-checkbox",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipCheckbox",
};

const Template = (args) => {
  const element = generateStoryElement("flip-checkbox", args);

  return element;
};

export const FlipCheckbox = Template.bind({});

FlipCheckbox.args = {
  checked: true,
  description: "Optional description of the item.",
  inputId: "checkbox",
  inputName: "Checkbox",
  label: "Checkbox",
};
