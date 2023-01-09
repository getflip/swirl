import { generateStoryElement } from "../../utils";
import Docs from "./flip-option-list.mdx";

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
  <flip-option-list-item label="This is option 1" value="1"></flip-option-list-item>
  <flip-option-list-item label="This is option 2" value="2"></flip-option-list-item>
  <flip-option-list-item label="This is option 3" value="3"></flip-option-list-item>
  <flip-option-list-item label="This is option 4" value="4"></flip-option-list-item>
`;

  return element;
};

export const FlipOptionList = Template.bind({});

FlipOptionList.args = {
  allowDrag: true,
  label: "Option List",
  multiSelect: true,
  value: ["2"],
};
