import { generateStoryElement } from "../../utils";
import Docs from "./flip-select.mdx";

export default {
  component: "flip-select",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipSelect",
};

const Template = (args) => {
  const formControl = document.createElement("flip-form-control");
  const element = generateStoryElement("flip-select", args);

  formControl.label = "Select";

  element.innerHTML = `
    <flip-option-list-section label="Section 1">
      <flip-option-list-item
        label="This is an option 1"
        value="1"
      ></flip-option-list-item>
      <flip-option-list-item
        label="This is an option 2"
        value="2"
      ></flip-option-list-item>
      <flip-option-list-item
        label="This is an option 3"
        value="3"
      ></flip-option-list-item>
    </flip-option-list-section>
    <flip-option-list-section label="Section 2">
      <flip-option-list-item
        label="This is an option 4"
        value="4"
      ></flip-option-list-item>
    </flip-option-list-section>
  `;

  formControl.append(element);

  return formControl;
};

export const FlipSelect = Template.bind({});

FlipSelect.args = {
  label: "Select",
  value: ["2"],
};
