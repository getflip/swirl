import { generateStoryElement } from "../../utils";
// @ts-ignore
import Docs from "./swirl-button.mdx";

export default {
  argTypes: {
    icon: {
      table: {
        type: {
          detail: "e.g. <swirl-icon-close></swirl-icon-close>",
          summary: "swirl-icon-*",
        },
      },
    },
  },
  component: "swirl-button",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlButton",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-button", args);

  return element;
};

export const SwirlButton = Template.bind({});

SwirlButton.args = {
  icon: "<swirl-icon-add></swirl-icon-add>",
  label: "Label",
};

const CustomLabelTemplate = (args) => {
  const element = generateStoryElement("swirl-button", args);

  element.innerHTML = `
    <span slot="label">Add <strong>item</strong></span>
  `;

  return element;
};

export const CustomLabel = CustomLabelTemplate.bind({});

CustomLabel.args = {
  icon: "<swirl-icon-add></swirl-icon-add>",
  label: "Add item",
};

const AriaDisabledTemplate = () => {
  const element = document.createElement("div");

  element.innerHTML = `
    <swirl-tooltip content="You can't delete the main language.">
      <swirl-button
        label="Delete"
        swirl-aria-describedby="delete-reason"
        swirl-aria-disabled="true"
      ></swirl-button>
    </swirl-tooltip>
    <swirl-visually-hidden id="delete-reason">
      You can't delete the main language.
    </swirl-visually-hidden>
  `;

  return element;
};

export const AriaDisabled = AriaDisabledTemplate.bind({});
