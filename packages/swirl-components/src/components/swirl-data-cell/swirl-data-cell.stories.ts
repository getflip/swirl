import { generateStoryElement } from "../../utils";
import Docs from "./swirl-data-cell.mdx";

export default {
  component: "swirl-data-cell",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlDataCell",
};

const Template = (args) => {
  const element = generateStoryElement(
    "swirl-data-cell",
    args
  ) as HTMLSwirlDataCellElement;

  return element;
};

export const SwirlDataCell = Template.bind({});

SwirlDataCell.args = {
  label: "Name",
  value: "John Doe",
};

export const WithIcon = Template.bind({});

WithIcon.args = {
  label: "Email",
  value: "john.doe@example.com",
  icon: "<swirl-icon-email></swirl-icon-email>",
};

export const WithImage = Template.bind({});

WithImage.args = {
  label: "Avatar",
  value: "John Doe",
  image: "/sample-2.jpg",
};

export const WithTooltip = Template.bind({});

WithTooltip.args = {
  label: "Status",
  value: "Active",
  tooltip: "This indicates the current status of the user",
};

export const WithSuffix = Template.bind({});

WithSuffix.args = {
  label: "Name",
  value: "John Doe",
};

WithSuffix.decorators = [
  (story) => {
    const element = story();
    element.innerHTML = `
      ${element.innerHTML}
      <swirl-button slot="suffix" label="Edit" variant="plain" icon="<swirl-icon-edit></swirl-icon-edit>" hide-label></swirl-button>
    `;
    return element;
  },
];

export const Vertical = Template.bind({});

Vertical.args = {
  label: "Name",
  value: "John Doe",
  vertical: true,
  icon: "<swirl-icon-person></swirl-icon-person>",
};

export const LabelOnly = Template.bind({});

LabelOnly.args = {
  label: "Description",
};

export const MultipleCells = () => {
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "var(--s-space-16)";

  const cell1 = generateStoryElement("swirl-data-cell", {
    label: "Name",
    value: "John Doe",
    icon: "<swirl-icon-person></swirl-icon-person>",
  });
  container.appendChild(cell1);

  const cell2 = generateStoryElement("swirl-data-cell", {
    label: "Email",
    value: "john.doe@example.com",
    icon: "<swirl-icon-email></swirl-icon-email>",
  });
  container.appendChild(cell2);

  const cell3 = generateStoryElement("swirl-data-cell", {
    label: "Phone",
    value: "+1 234 567 8900",
    icon: "<swirl-icon-phone></swirl-icon-phone>",
  });
  container.appendChild(cell3);

  return container;
};

