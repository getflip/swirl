import { generateStoryElement } from "../../utils";
import Docs from "./swirl-option-list.mdx";

export default {
  component: "flip-option-list",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipOptionList",
};

const Template = (args) => {
  const element = generateStoryElement("flip-option-list", args);

  element.innerHTML = `
    <flip-option-list-section label="Section 1">
      <flip-option-list-item label="This is an option" value="1"></flip-option-list-item>
      <flip-option-list-item label="This is an option" value="2"></flip-option-list-item>
      <flip-option-list-item label="This is an option" value="3"></flip-option-list-item>
    </flip-option-list-section>
    <flip-option-list-section label="Section 2">
      <flip-option-list-item label="This is an option" value="4"></flip-option-list-item>
    </flip-option-list-section>
`;

  return element;
};

export const FlipOptionList = Template.bind({});

FlipOptionList.args = {
  label: "Option List",
  value: ["2"],
};
