import { addAttributesToElement, generateStoryElement } from "../../utils";
import Docs from "./swirl-time-input.mdx";

export default {
  argTypes: {
    format: {
      description: "See https://date-fns.org/v2.29.3/docs/format.",
      table: {
        type: {
          detail: '"hh", "HH", "mm", "ss", and separators (e.g. ":", ".", ",")',
          summary: "Allowed patterns",
        },
      },
    },
  },
  component: "swirl-time-input",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlTimeInput",
};

const Template = (args) => {
  const formControl = document.createElement("swirl-form-control");
  const element = generateStoryElement("swirl-time-input", args);

  addAttributesToElement(formControl, { ...args, label: "Time" });
  formControl.append("\n  ", element, "\n");

  return formControl;
};

export const SwirlTimeInput = Template.bind({});

SwirlTimeInput.args = {};
