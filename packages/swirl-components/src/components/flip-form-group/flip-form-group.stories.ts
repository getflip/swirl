import { generateStoryElement } from "../../utils";
import Docs from "./flip-form-group.mdx";

export default {
  component: "flip-form-group",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipFormGroup",
};

const Template = (args) => {
  const element = generateStoryElement("flip-form-group", args);

  element.innerHTML = `
    <flip-form-group orientation="horizontal">
      <flip-form-control label="First name">
        <flip-text-input type="text" value="John"></flip-text-input>
      </flip-form-control>
      <flip-form-control label="Last name">
        <flip-text-input type="text" value="Doe"></flip-text-input>
      </flip-form-control>
    </flip-form-group>

    <flip-form-control label="Email">
      <flip-text-input type="email"></flip-text-input>
    </flip-form-control>
  `;

  return element;
};

export const FlipFormGroup = Template.bind({});

FlipFormGroup.args = {};
