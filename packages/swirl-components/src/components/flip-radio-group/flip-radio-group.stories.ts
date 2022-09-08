import { generateStoryElement } from "../../utils";
import Docs from "./flip-radio-group.mdx";

export default {
  component: "flip-radio-group",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipRadioGroup",
};

const Template = (args) => {
  const element = generateStoryElement("flip-radio-group", args);

  element.innerHTML = `
    <flip-radio input-id="radio-1" input-name="radio" label="Radio button #1" value="1"></flip-radio>
    <flip-radio input-id="radio-2" input-name="radio" label="Radio button #2" value="2"></flip-radio>
    <flip-radio input-id="radio-3" input-name="radio" label="Radio button #3" value="3"></flip-radio>
  `;

  return element;
};

export const FlipRadioGroup = Template.bind({});

FlipRadioGroup.args = {
  "aria-label": "Radio group",
  value: "2",
};
