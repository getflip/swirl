import { generateStoryElement } from "../../utils";
import Docs from "./flip-button-group.mdx";

export default {
  component: "flip-button-group",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipButtonGroup",
};

const Template = (args) => {
  const element = generateStoryElement("flip-button-group", args);

  element.innerHTML = `
    <flip-button label="Button"></flip-button>
    <flip-button intent="primary" label="Button" variant="flat"></flip-button>
  `;

  return element;
};

export const FlipButtonGroup = Template.bind({});

FlipButtonGroup.args = {};
