import { generateStoryElement } from "../../utils";
import Docs from "./flip-button-group.mdx";

export default {
  argTypes: {
    segmented: {
      description:
        'Should only be used with button variant "flat" and horizontal orientation.',
    },
  },
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
    <flip-button label="Button" variant="flat"></flip-button>
    <flip-button label="Button" variant="flat"></flip-button>
    <flip-button icon="<flip-icon-expand-more></flip-icon-expand-more>" label="Button" hide-label variant="flat"></flip-button>
  `;

  return element;
};

export const FlipButtonGroup = Template.bind({});

FlipButtonGroup.args = {};
