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
    <swirl-data-cell label="Email" value="john.doe@example.com" icon="<swirl-icon-email></swirl-icon-email>"></swirl-data-cell>
    <swirl-data-cell label="Phone" value="+1 234 567 8900" icon="<swirl-icon-phone></swirl-icon-phone>"></swirl-data-cell>
  `;

  return element;
};

export const SwirlDataCellStack = Template.bind({});

SwirlDataCellStack.args = {
  label: "User Information",
  description: "Basic user contact details",
};

export const WithLabelOnly = Template.bind({});

WithLabelOnly.args = {
  label: "User Information",
};

export const WithDescriptionOnly = Template.bind({});

WithDescriptionOnly.args = {
  description: "Basic user contact details",
};

export const WithCTA = Template.bind({});

WithCTA.args = {
  label: "User Information",
  description: "Basic user contact details",
};

WithCTA.decorators = [
  (story) => {
    const element = story();
    element.innerHTML = `
      ${element.innerHTML}
      <swirl-button slot="cta" label="Edit" variant="plain"></swirl-button>
    `;
    return element;
  },
];

export const WithoutHeader = Template.bind({});

WithoutHeader.args = {};

export const WithHiddenLabel = Template.bind({});

WithHiddenLabel.args = {
  label: "User Information",
  hideLabel: true,
  description: "This label is hidden but available for screen readers",
};

export const MultipleStacks = () => {
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "var(--s-space-24)";

  const stack1 = generateStoryElement("swirl-data-cell-stack", {
    label: "Contact Information",
    description: "Primary contact details",
  });
  stack1.innerHTML = `
    <swirl-data-cell label="Email" value="john.doe@example.com" icon="<swirl-icon-email></swirl-icon-email>"></swirl-data-cell>
    <swirl-data-cell label="Phone" value="+1 234 567 8900" icon="<swirl-icon-phone></swirl-icon-phone>"></swirl-data-cell>
  `;
  container.appendChild(stack1);

  const stack2 = generateStoryElement("swirl-data-cell-stack", {
    label: "Address",
    description: "Mailing address",
  });
  stack2.innerHTML = `
    <swirl-data-cell label="Street" value="123 Main St"></swirl-data-cell>
    <swirl-data-cell label="City" value="New York"></swirl-data-cell>
    <swirl-data-cell label="ZIP Code" value="10001"></swirl-data-cell>
  `;
  container.appendChild(stack2);

  return container;
};
