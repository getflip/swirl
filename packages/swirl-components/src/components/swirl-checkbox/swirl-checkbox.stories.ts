import { generateStoryElement } from "../../utils";
import Docs from "./swirl-checkbox.mdx";

export default {
  argTypes: {
    checked: {
      control: "radio",
      options: [false, "indeterminate", true],
    },
  },
  component: "swirl-checkbox",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlCheckbox",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-checkbox", args);

  return element;
};

export const SwirlCheckbox = Template.bind({});

SwirlCheckbox.args = {
  checked: true,
  description: "Optional description of the item.",
  inputId: "checkbox",
  inputName: "Checkbox",
  label: "Checkbox",
};
