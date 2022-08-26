import { generateStoryElement } from "../../utils";
import Docs from "./flip-radio.mdx";

export default {
  component: "flip-radio",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipRadio",
};

const Template = (args) => {
  const element = generateStoryElement("flip-radio", args);

  return element;
};

export const FlipRadio = Template.bind({});

FlipRadio.args = {
  checked: false,
  inputId: "radio",
  inputName: "radio",
  label: "Radio button",
  value: "Value",
};
