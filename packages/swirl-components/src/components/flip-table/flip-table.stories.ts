import { generateStoryElement } from "../../utils";
import Docs from "./flip-table.mdx";

export default {
  component: "flip-table",
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/FlipTable",
};

const Template = (args) => {
  const container = document.createElement("flip-box");
  const element = generateStoryElement("flip-table", args);

  container.setAttribute("overflow", "auto");

  element.innerHTML = `
    <div slot="columns">
      <flip-table-column sticky width="74px"><flip-visually-hidden>Avatar</flip-visually-hidden></flip-table-column>
      <flip-table-column min-width="180px" sticky>User</flip-table-column>
      <flip-table-column>User ID</flip-table-column>
      <flip-table-column max-width="112px">Logins</flip-table-column>
      <flip-table-column>Latest login</flip-table-column>
      <flip-table-column>Status</flip-table-column>
      <flip-table-column sticky width="74px"><flip-visually-hidden>Tools</flip-visually-hidden></flip-table-column>
    </div>
    <div slot="rows">
      <flip-table-row>
        <flip-table-cell>
          <flip-avatar label="John Doe" src="https://picsum.photos/id/433/144/144"></flip-avatar>
        </flip-table-cell>
        <flip-table-cell>
          <flip-text size="sm" weight="medium">Isabel Lakin</flip-text>
        </flip-table-cell>
        <flip-table-cell>
          <flip-text size="sm" truncate>1234567890</flip-text>
        </flip-table-cell>
        <flip-table-cell>
          <flip-text size="sm" truncate>21</flip-text>
        </flip-table-cell>
        <flip-table-cell>
          <flip-text size="sm">24.11.2022 13:39</flip-text>
        </flip-table-cell>
        <flip-table-cell>
          <flip-tag label="Active" intent="success"></flip-tag>
        </flip-table-cell>
        <flip-table-cell>
          <flip-button hide-label icon="<flip-icon-more-vertikal></flip-icon-more-vertikal>" label="Options"></flip-button>
        </flip-table-cell>
      </flip-table-row>
      <flip-table-row>
        <flip-table-cell>
          <flip-avatar label="John Doe" src="https://picsum.photos/id/433/144/144"></flip-avatar>
        </flip-table-cell>
        <flip-table-cell>
          <flip-text size="sm" weight="medium">Doyle Stoltenberg</flip-text>
        </flip-table-cell>
        <flip-table-cell>
          <flip-text size="sm" truncate>0987654321</flip-text>
        </flip-table-cell>
        <flip-table-cell>
          <flip-text size="sm" truncate>432</flip-text>
        </flip-table-cell>
        <flip-table-cell>
          <flip-text size="sm">24.11.2022 13:39</flip-text>
        </flip-table-cell>
        <flip-table-cell>
          <flip-tag label="Pending" intent="warning"></flip-tag>
        </flip-table-cell>
        <flip-table-cell>
          <flip-button hide-label icon="<flip-icon-more-vertikal></flip-icon-more-vertikal>" label="Options"></flip-button>
        </flip-table-cell>
      </flip-table-row>
    </div>
  `;

  container.append("\n  ", element, "\n");

  return container;
};

export const FlipTable = Template.bind({});

FlipTable.args = {
  caption: "A table displaying data.",
  label: "Table",
};
