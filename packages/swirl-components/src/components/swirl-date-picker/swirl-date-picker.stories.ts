import { generateStoryElement } from "../../utils";
import Docs from "./swirl-date-picker.mdx";

export default {
  component: "swirl-date-picker",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlDatePicker",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-date-picker", args);

  return element;
};

export const SwirlDatePicker = Template.bind({});

SwirlDatePicker.args = {};
