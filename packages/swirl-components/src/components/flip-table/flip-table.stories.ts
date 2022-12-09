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
  const element = generateStoryElement("flip-table", args);

  element.innerHTML = `
    <div slot="columns">
      <flip-table-column sticky width="58px">
        <flip-checkbox flip-aria-label="Select all" input-id="select" input-name="select">
        </flip-checkbox><flip-visually-hidden>Select</flip-visually-hidden>
      </flip-table-column>
      <flip-table-column min-width="160px" sticky>User</flip-table-column>
      <flip-table-column min-width="120px">User ID</flip-table-column>
      <flip-table-column min-width="200px" sortable sort="descending">Email</flip-table-column>
      <flip-table-column>Location</flip-table-column>
      <flip-table-column>Logins</flip-table-column>
      <flip-table-column>Latest login</flip-table-column>
      <flip-table-column>User Status</flip-table-column>
      <flip-table-column sticky width="74px"><flip-visually-hidden>Tools</flip-visually-hidden></flip-table-column>
    </div>
    <div slot="rows">
      <flip-table-row>
        <flip-table-cell>
          <flip-checkbox flip-aria-label="Select Isabel Lakin" input-id="select-1" input-name="select-1">
        </flip-table-cell>
        <flip-table-cell>
          <flip-text size="sm" weight="medium">Isabel Lakin</flip-text>
        </flip-table-cell>
        <flip-table-cell>
          <flip-text size="sm" truncate>1234567890</flip-text>
        </flip-table-cell>
        <flip-table-cell>
          <flip-text size="sm"><flip-link href="#" label="isabel.lakin@flipapp.de"></flip-link></flip-text>
        </flip-table-cell>
        <flip-table-cell>
          <flip-text size="sm">DE</flip-text>
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
          <flip-checkbox flip-aria-label="Select Doyle Stoltenberg" input-id="select-2" input-name="select-2">
        </flip-table-cell>
        <flip-table-cell>
          <flip-text size="sm" weight="medium">Doyle Stoltenberg</flip-text>
        </flip-table-cell>
        <flip-table-cell>
          <flip-text size="sm" truncate>0987654321</flip-text>
        </flip-table-cell>
        <flip-table-cell>
          <flip-text size="sm"><flip-link href="#" label="john.doe@flipapp.de"></flip-link></flip-text>
        </flip-table-cell>
        <flip-table-cell>
          <flip-text size="sm">DE</flip-text>
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
      <flip-table-row highlighted>
        <flip-table-cell>
          <flip-checkbox checked="true" flip-aria-label="Select Don Conroy" input-id="select-3" input-name="select-3">
        </flip-table-cell>
        <flip-table-cell>
          <flip-text size="sm" weight="medium">Don Conroy</flip-text>
        </flip-table-cell>
        <flip-table-cell>
          <flip-text size="sm" truncate>5432167890</flip-text>
        </flip-table-cell>
        <flip-table-cell>
          <flip-text size="sm"><flip-link href="#" label="don.conroy@flipapp.de"></flip-link></flip-text>
        </flip-table-cell>
        <flip-table-cell>
          <flip-text size="sm">DE</flip-text>
        </flip-table-cell>
        <flip-table-cell>
          <flip-text size="sm" truncate>0</flip-text>
        </flip-table-cell>
        <flip-table-cell>
          <flip-text size="sm">-</flip-text>
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

  return element;
};

export const FlipTable = Template.bind({});

FlipTable.args = {
  caption: "A table displaying data.",
  label: "Table",
};
