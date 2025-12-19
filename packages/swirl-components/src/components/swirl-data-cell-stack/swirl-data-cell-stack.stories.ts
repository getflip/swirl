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
    <swirl-data-cell label="Name" value="John Doe" icon="<swirl-icon-person></swirl-icon-person>"></swirl-data-cell>
    <swirl-data-cell label="Email" value="john.doe@example.com" icon="<swirl-icon-mail></swirl-icon-mail>"></swirl-data-cell>
    <swirl-data-cell label="Phone" value="+1 234 567 8900" icon="<swirl-icon-phone></swirl-icon-phone>"></swirl-data-cell>
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
     <swirl-data-cell label="Name" value="John Doe" icon="<swirl-icon-person></swirl-icon-person>"></swirl-data-cell>
    <swirl-data-cell label="Email" value="john.doe@example.com" icon="<swirl-icon-mail></swirl-icon-mail>"></swirl-data-cell>
    <swirl-data-cell label="Phone" value="+1 234 567 8900" icon="<swirl-icon-phone></swirl-icon-phone>"></swirl-data-cell>
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
    <swirl-button slot="cta" label="Edit" variant="outline" icon="<swirl-icon-edit></swirl-icon-edit>"></swirl-button>
  `;
  container.appendChild(stack2);

  return container;
};
