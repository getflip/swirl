import { generateStoryElement } from "../../utils";
import Docs from "./swirl-switch.mdx";

export default {
  component: "swirl-switch",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlSwitch",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-switch", args);

  return element;
};

export const SwirlSwitch = Template.bind({});

SwirlSwitch.args = {
  checked: true,
  inputId: "switch",
  inputName: "switch",
  label: "Switch",
};
