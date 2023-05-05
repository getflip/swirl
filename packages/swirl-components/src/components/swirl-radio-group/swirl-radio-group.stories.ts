import { generateStoryElement } from "../../utils";
import Docs from "./swirl-radio-group.mdx";

export default {
  component: "swirl-radio-group",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlRadioGroup",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-radio-group", args);

  element.innerHTML = `
    <swirl-radio input-id="radio-1" input-name="radio" label="Radio button #1" value="1"></swirl-radio>
    <swirl-radio input-id="radio-2" input-name="radio" label="Radio button #2" value="2"></swirl-radio>
    <swirl-radio input-id="radio-3" input-name="radio" label="Radio button #3" value="3"></swirl-radio>
  `;

  return element;
};

export const SwirlRadioGroup = Template.bind({});

SwirlRadioGroup.args = {
  "aria-label": "Radio group",
  value: "2",
};
