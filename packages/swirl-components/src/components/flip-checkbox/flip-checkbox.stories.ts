import { generateStoryElement } from "../../utils";
import Docs from "./flip-checkbox.mdx";

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
  const element = generateStoryElement(
    "flip-checkbox",
    args
  ) as HTMLFlipCheckboxElement;

  element.addEventListener("valueChange", () => {
    element.checked = !element.checked;
  });

  return element;
};

export const FlipCheckbox = Template.bind({});

FlipCheckbox.args = {
  checked: true,
  inputId: "checkbox",
  inputName: "Checkbox",
  label: "Checkbox",
};
