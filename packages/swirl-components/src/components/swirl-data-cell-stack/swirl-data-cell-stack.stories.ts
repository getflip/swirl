import { generateStoryElement } from "../../utils";
import Docs from "./swirl-data-cell-stack.mdx";

export default {
  component: "swirl-data-cell-stack",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlDataCellStack",
};

const Template = (args) => {
  const element = generateStoryElement(
    "swirl-data-cell-stack",
    args
  ) as HTMLSwirlDataCellStackElement;

  element.innerHTML = `
    <swirl-data-cell label="Name" value="John Doe">
      <swirl-avatar slot="media" label="John Doe" icon="<swirl-icon-person></swirl-icon-person>" size="s"></swirl-avatar>
    </swirl-data-cell>
    <swirl-data-cell label="Email" value="john.doe@example.com">
      <swirl-avatar slot="media" label="Email" icon="<swirl-icon-mail></swirl-icon-mail>" size="s"></swirl-avatar>
    </swirl-data-cell>
    <swirl-data-cell label="Phone" value="+1 234 567 8900">
      <swirl-avatar slot="media" label="Phone" icon="<swirl-icon-phone></swirl-icon-phone>" size="s"></swirl-avatar>
    </swirl-data-cell>
  `;

  return element;
};

export const SwirlDataCellStack = Template.bind({});

SwirlDataCellStack.args = {
  label: "User Information",
  description: "Basic user contact details",
};

export const MultipleStacks = () => {
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "var(--s-space-24)";

  // Stack with label and description
  const stack1 = generateStoryElement("swirl-data-cell-stack", {
    label: "User Information",
    description: "Basic user contact details",
  });
  stack1.innerHTML = `
    <swirl-data-cell label="Name" value="John Doe">
      <swirl-avatar slot="media" label="John Doe" icon="<swirl-icon-person></swirl-icon-person>" size="s"></swirl-avatar>
    </swirl-data-cell>
    <swirl-data-cell label="Email" value="john.doe@example.com">
      <swirl-avatar slot="media" label="Email" icon="<swirl-icon-mail></swirl-icon-mail>" size="s"></swirl-avatar>
    </swirl-data-cell>
    <swirl-data-cell label="Phone" value="+1 234 567 8900">
      <swirl-avatar slot="media" label="Phone" icon="<swirl-icon-phone></swirl-icon-phone>" size="s"></swirl-avatar>
    </swirl-data-cell>
  `;
  container.appendChild(stack1);

  // Stack with CTA
  const stack2 = generateStoryElement("swirl-data-cell-stack", {
    label: "Address",
    description: "Mailing address",
  });
  stack2.innerHTML = `
    <swirl-data-cell label="Street" value="123 Main St"></swirl-data-cell>
    <swirl-data-cell label="City" value="New York"></swirl-data-cell>
    <swirl-data-cell label="ZIP Code" value="10001"></swirl-data-cell>
    <swirl-button-group slot="cta">
      <swirl-button label="Edit" variant="ghost" icon="<swirl-icon-edit></swirl-icon-edit>"></swirl-button>
      <swirl-button label="Delete" variant="ghost" icon="<swirl-icon-delete></swirl-icon-delete>"></swirl-button>
    </swirl-button-group>
  `;
  container.appendChild(stack2);

  return container;
};
