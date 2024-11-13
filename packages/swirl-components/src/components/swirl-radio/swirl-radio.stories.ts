import { generateStoryElement } from "../../utils";
import Docs from "./swirl-radio.mdx";

export default {
  component: "swirl-radio",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlRadio",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-radio", args);

  return element;
};

export const SwirlRadio = Template.bind({});

SwirlRadio.args = {
  checked: false,
  description: "Optional description of the item",
  inputId: "radio",
  inputName: "radio",
  label: "Radio button",
  tooltip: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
  value: "Value",
};
