import { generateStoryElement } from "../../utils";
import Docs from "./flip-date-input.mdx";

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
  component: "flip-date-input",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipDateInput",
};

const Template = (args) => {
  const element = generateStoryElement("flip-date-input", args);

  return element;
};

export const FlipDateInput = Template.bind({});

FlipDateInput.args = {};
