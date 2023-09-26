import { generateStoryElement } from "../../utils";
import Docs from "./swirl-select.mdx";

export default {
  component: "swirl-select",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlSelect",
};

const Template = (args) => {
  const formControl = document.createElement("swirl-form-control");
  const element = generateStoryElement("swirl-select", args);

  formControl.label = "Select";

  element.innerHTML = `
    <swirl-option-list-section label="Section 1">
      <swirl-option-list-item
        label="This is an option 1"
        value="1"
      ></swirl-option-list-item>
      <swirl-option-list-item
        label="This is an option 2"
        value="2"
      ></swirl-option-list-item>
      <swirl-option-list-item
        label="This is an option 3"
        value="3"
      ></swirl-option-list-item>
    </swirl-option-list-section>
    <swirl-option-list-section label="Section 2">
      <swirl-option-list-item
        label="This is an option 4"
        value="4"
      ></swirl-option-list-item>
    </swirl-option-list-section>
  `;

  formControl.append(element);

  return formControl;
};

export const SwirlSelect = Template.bind({});

SwirlSelect.args = {
  label: "Select",
  searchPlaceholder: "Search …",
  value: ["2"],
  withSearch: true,
};
