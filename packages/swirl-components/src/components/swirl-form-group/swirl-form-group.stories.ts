import { generateStoryElement } from "../../utils";
import Docs from "./swirl-form-group.mdx";

export default {
  component: "swirl-form-group",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlFormGroup",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-form-group", args);

  element.innerHTML = `
    <swirl-form-group orientation="horizontal">
      <swirl-form-control label="First name">
        <swirl-text-input type="text" value="John"></swirl-text-input>
      </swirl-form-control>
      <swirl-form-control label="Last name">
        <swirl-text-input type="text" value="Doe"></swirl-text-input>
      </swirl-form-control>
    </swirl-form-group>

    <swirl-form-control label="Email">
      <swirl-text-input type="email"></swirl-text-input>
    </swirl-form-control>
  `;

  return element;
};

export const SwirlFormGroup = Template.bind({});

SwirlFormGroup.args = {};
