import { generateStoryElement } from "../../utils";
import Docs from "./swirl-date-picker.mdx";

export default {
  argTypes: {
    locale: {
      control: { type: "object" },
    },
  },
  component: "flip-date-picker",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipDatePicker",
};

const Template = (args) => {
  const element = generateStoryElement("flip-date-picker", args);

  return element;
};

export const FlipDatePicker = Template.bind({});

FlipDatePicker.args = {};
