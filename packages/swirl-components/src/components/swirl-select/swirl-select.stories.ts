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
    <swirl-option-list-section label="Fruits">
      <swirl-option-list-item
        label="Apple"
        value="1"
      ></swirl-option-list-item>
      <swirl-option-list-item
        label="Apricot"
        value="2"
      ></swirl-option-list-item>
      <swirl-option-list-item
        label="Avocado"
        value="3"
      ></swirl-option-list-item>
      <swirl-option-list-item
        label="Artichoke"
        value="4"
      ></swirl-option-list-item>
      <swirl-option-list-item
        label="Banana"
        value="5"
      ></swirl-option-list-item>
      <swirl-option-list-item
        label="Blueberry"
        value="6"
      ></swirl-option-list-item>
    </swirl-option-list-section>
    <swirl-option-list-section label="Vegetables">
      <swirl-option-list-item
        label="Carrot"
        value="7"
      ></swirl-option-list-item>
      <swirl-option-list-item
        label="Celery"
        value="8"
      ></swirl-option-list-item>
      <swirl-option-list-item
        label="Tomato"
        value="9"
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
