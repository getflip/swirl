import { generateStoryElement } from "../../utils";
import Docs from "./swirl-radio.mdx";

export default {
  component: "swirl-radio",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlRadio",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-radio", args);

  return element;
};

export const SwirlRadio = Template.bind({});

SwirlRadio.args = {
  checked: false,
  description: "Optional description of the item",
  inputId: "radio",
  inputName: "radio",
  label: "Radio button",
  tooltip: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
  value: "Value",
};

const CardWithIconTemplate = () => {
  const element = document.createElement("swirl-radio-group");

  element.setAttribute("aria-label", "Role scope");
  element.setAttribute("value", "organization");

  element.innerHTML = `
    <swirl-columns columns="repeat(2, minmax(0, 1fr))" spacing="16">
      <swirl-radio
        description="View and enable organization-wide permissions here."
        icon="<swirl-icon-groups></swirl-icon-groups>"
        input-id="radio-organization"
        input-name="role-scope"
        label="Organization role"
        value="organization"
        variant="card"
      ></swirl-radio>
      <swirl-radio
        description="Create a role that gives permissions only within the selected user group."
        icon="<swirl-icon-folder-shared></swirl-icon-folder-shared>"
        input-id="radio-user-group"
        input-name="role-scope"
        label="User group role"
        value="user-group"
        variant="card"
      ></swirl-radio>
    </swirl-columns>
  `;

  return element;
};

export const SwirlRadioCardWithIcon = CardWithIconTemplate.bind({});
