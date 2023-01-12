import { generateStoryElement } from "../../utils";
import Docs from "./swirl-option-list.mdx";

export default {
  component: "swirl-option-list",
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
    <swirl-option-list-section label="Section 1">
      <swirl-option-list-item label="This is an option" value="1"></swirl-option-list-item>
      <swirl-option-list-item label="This is an option" value="2"></swirl-option-list-item>
      <swirl-option-list-item label="This is an option" value="3"></swirl-option-list-item>
    </swirl-option-list-section>
    <swirl-option-list-section label="Section 2">
      <swirl-option-list-item label="This is an option" value="4"></swirl-option-list-item>
    </swirl-option-list-section>
`;

  return element;
};

export const SwirlOptionList = Template.bind({});

SwirlOptionList.args = {
  label: "Option List",
  value: ["2"],
};
