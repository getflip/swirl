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
};

// Add media slot content to the default story
SwirlDataCell.decorators = [
  (story) => {
    const element = story();
    if (element) {
      element.innerHTML = `
        <swirl-avatar slot="media" label="John Doe" icon="<swirl-icon-person></swirl-icon-person>" size="s"></swirl-avatar>
      `;
    }
    return element;
  },
];

export const MultipleCells = () => {
  const stack = generateStoryElement("swirl-data-cell-stack", {});

  stack.innerHTML = `
    <!-- Basic cell -->
    <swirl-data-cell label="Name" value="John Doe"></swirl-data-cell>

    <!-- With icon avatar -->
    <swirl-data-cell label="Email" value="john.doe@example.com">
      <swirl-avatar slot="media" label="Email" icon="<swirl-icon-mail></swirl-icon-mail>" size="s"></swirl-avatar>
    </swirl-data-cell>

    <!-- With image avatar -->
    <swirl-data-cell label="Avatar" value="John Doe">
      <swirl-avatar slot="media" label="John Doe" src="/sample-2.jpg" size="s"></swirl-avatar>
    </swirl-data-cell>

    <!-- With avatar initials (placeholder while image loads) -->
    <swirl-data-cell label="User" value="Jane Smith">
      <swirl-avatar slot="media" label="Jane Smith" src="/sample-3.jpg" initials="JS" size="s"></swirl-avatar>
    </swirl-data-cell>

    <!-- With tooltip -->
    <swirl-data-cell label="Status" value="Active" tooltip="This indicates the current status of the user"></swirl-data-cell>

    <!-- With suffix -->
    <swirl-data-cell label="Name" value="John Doe">
      <swirl-button slot="suffix" label="Edit" variant="plain" icon="<swirl-icon-edit></swirl-icon-edit>" hide-label></swirl-button>
    </swirl-data-cell>

    <!-- Vertical layout -->
    <swirl-data-cell label="Name" value="John Doe" vertical>
      <swirl-avatar slot="media" label="John Doe" icon="<swirl-icon-person></swirl-icon-person>" size="s"></swirl-avatar>
    </swirl-data-cell>

    <!-- Label only -->
    <swirl-data-cell label="Description"></swirl-data-cell>
  `;

  return stack;
};
