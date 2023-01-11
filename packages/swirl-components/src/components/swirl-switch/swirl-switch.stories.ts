import { generateStoryElement } from "../../utils";
import Docs from "./swirl-switch.mdx";

export default {
  component: "flip-switch",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipSwitch",
};

const Template = (args) => {
  const element = generateStoryElement("flip-switch", args);

  return element;
};

export const FlipSwitch = Template.bind({});

FlipSwitch.args = {
  checked: true,
  inputId: "switch",
  inputName: "switch",
  label: "Switch",
};
