import { generateStoryElement } from "../../utils";
import Docs from "./swirl-toggle-button.mdx";

export default {
  component: "swirl-toggle-button",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlToggleButton",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-toggle-button", args);

  return element;
};

export const SwirlToggleButton = Template.bind({});

SwirlToggleButton.args = {
  label: "Label",
  identifier: "identifier",
  icon: "mention",
};
