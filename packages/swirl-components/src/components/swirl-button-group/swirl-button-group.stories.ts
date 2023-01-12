import { generateStoryElement } from "../../utils";
import Docs from "./swirl-button-group.mdx";

export default {
  argTypes: {
    segmented: {
      description:
        'Should only be used with button variant "flat" and horizontal orientation.',
    },
  },
  component: "swirl-button-group",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlButtonGroup",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-button-group", args);

  element.innerHTML = `
    <swirl-button label="Button" variant="flat"></swirl-button>
    <swirl-button label="Button" variant="flat"></swirl-button>
    <swirl-button icon="<swirl-icon-expand-more></swirl-icon-expand-more>" label="Button" hide-label variant="flat"></swirl-button>
  `;

  return element;
};

export const SwirlButtonGroup = Template.bind({});

SwirlButtonGroup.args = {};
