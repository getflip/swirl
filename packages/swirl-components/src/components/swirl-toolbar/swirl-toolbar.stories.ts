import { generateStoryElement } from "../../utils";
import Docs from "./swirl-toolbar.mdx";

export default {
  component: "swirl-toolbar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlToolbar",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-toolbar", args);

  element.innerHTML = `
    <swirl-chip label="Remove" pressed="true"></swirl-chip>
    <swirl-button icon="<swirl-icon-add></swirl-icon-add>" label="Add"></swirl-button>
  `;

  return element;
};

export const SwirlToolbar = Template.bind({});

SwirlToolbar.args = {
  label: "Label",
};
