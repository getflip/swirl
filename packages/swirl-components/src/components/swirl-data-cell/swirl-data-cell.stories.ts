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
  tooltip: "This is a tooltip",
  icon: "<swirl-icon-person></swirl-icon-person>",
};

export const MultipleCells = () => {
  const stack = generateStoryElement("swirl-data-cell-stack", {});

  stack.innerHTML = `
    <!-- Basic cell -->
    <swirl-data-cell label="Name" value="John Doe"></swirl-data-cell>

    <!-- With icon -->
    <swirl-data-cell label="Email" value="john.doe@example.com" icon="<swirl-icon-mail></swirl-icon-mail>"></swirl-data-cell>

    <!-- With image -->
    <swirl-data-cell label="Avatar" value="John Doe" image="/sample-2.jpg"></swirl-data-cell>

    <!-- With tooltip -->
    <swirl-data-cell label="Status" value="Active" tooltip="This indicates the current status of the user"></swirl-data-cell>

    <!-- With suffix -->
    <swirl-data-cell label="Name" value="John Doe">
      <swirl-button slot="suffix" label="Edit" variant="plain" icon="<swirl-icon-edit></swirl-icon-edit>" hide-label></swirl-button>
    </swirl-data-cell>

    <!-- Vertical layout -->
    <swirl-data-cell label="Name" value="John Doe" vertical icon="<swirl-icon-person></swirl-icon-person>"></swirl-data-cell>

    <!-- Label only -->
    <swirl-data-cell label="Description"></swirl-data-cell>
  `;

  return stack;
};
