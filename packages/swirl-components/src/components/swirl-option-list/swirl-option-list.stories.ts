import { generateStoryElement } from "../../utils";
import Docs from "./swirl-option-list.mdx";

export default {
  component: "swirl-option-list",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlOptionList",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-option-list", args);

  element.innerHTML = `
    <swirl-option-list-item label="This is option 1" value="1"></swirl-option-list-item>
    <swirl-option-list-item label="This is option 2" value="2"></swirl-option-list-item>
    <swirl-option-list-item label="This is option 3" value="3"></swirl-option-list-item>
    <swirl-option-list-item label="This is option 4" value="4"></swirl-option-list-item>
  `;

  return element;
};

export const SwirlOptionList = Template.bind({});

SwirlOptionList.args = {
  allowDrag: true,
  label: "Option List",
  multiSelect: true,
  value: ["2"],
};
