import { generateStoryElement } from "../../utils";
import Docs from "./swirl-date-input.mdx";

export default {
  argTypes: {
    format: {
      description: "See https://date-fns.org/v2.29.3/docs/format.",
      table: {
        type: {
          detail: '"d", "M", "y", and separators (e.g. ".", "-", "/", " ")',
          summary: "Allowed patterns",
        },
      },
    },
    locale: {
      control: { type: "object" },
    },
  },
  component: "swirl-date-input",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlDateInput",
};

const Template = (args) => {
  const formControl = document.createElement("swirl-form-control");
  const element = generateStoryElement("swirl-date-input", args);

  formControl.setAttribute("label", "Date");
  formControl.append("\n  ", element, "\n");

  return formControl;
};

export const SwirlDateInput = Template.bind({});

SwirlDateInput.args = {};
