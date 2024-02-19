import { generateStoryElement } from "../../utils";
import Docs from "./swirl-table.mdx";

export default {
  component: "swirl-table",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlTable",
};

const Template = (args) => {
  const element = generateStoryElement("swirl-table", args);

  element.innerHTML = `
    <div slot="columns">
      <swirl-table-column sticky width="58px">
        <swirl-checkbox checked="indeterminate" swirl-aria-label="Select all" input-id="select" input-name="select">
        </swirl-checkbox><swirl-visually-hidden>Select</swirl-visually-hidden>
      </swirl-table-column>
      <swirl-table-column min-width="160px" sticky>User</swirl-table-column>
      <swirl-table-column min-width="120px">User ID</swirl-table-column>
      <swirl-table-column min-width="200px" sortable sort="descending">Email</swirl-table-column>
      <swirl-table-column>Location</swirl-table-column>
      <swirl-table-column>Logins</swirl-table-column>
      <swirl-table-column>Latest login</swirl-table-column>
      <swirl-table-column>User status</swirl-table-column>
      <swirl-table-column sticky width="74px"><swirl-visually-hidden>Tools</swirl-visually-hidden></swirl-table-column>
    </div>
    <div slot="rows">
    <swirl-table-row-group label="Active users">
      <swirl-table-row>
        <swirl-table-cell>
          <swirl-checkbox swirl-aria-label="Select Isabel Lakin" input-id="select-1" input-name="select-1">
        </swirl-table-cell>
        <swirl-table-cell>
          <swirl-text size="sm" weight="medium">Isabel Lakin</swirl-text>
        </swirl-table-cell>
        <swirl-table-cell>
          <swirl-text size="sm" truncate>1234567890</swirl-text>
        </swirl-table-cell>
        <swirl-table-cell>
          <swirl-text size="sm"><swirl-link href="#" label="isabel.lakin@flipapp.de"></swirl-link></swirl-text>
        </swirl-table-cell>
        <swirl-table-cell>
          <swirl-text size="sm">DE</swirl-text>
        </swirl-table-cell>
        <swirl-table-cell>
          <swirl-text size="sm" truncate>21</swirl-text>
        </swirl-table-cell>
        <swirl-table-cell>
          <swirl-text size="sm">24.11.2022 13:39</swirl-text>
        </swirl-table-cell>
        <swirl-table-cell>
          <swirl-tag label="Active" intent="success"></swirl-tag>
        </swirl-table-cell>
        <swirl-table-cell>
          <swirl-tooltip position="left" content="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.">
            <swirl-button label="Test"></swirl-button>
          </swirl-tooltip>
        </swirl-table-cell>
      </swirl-table-row>
      </swirl-table-row-group>
      <swirl-table-row-group label="Pending users">
        <swirl-table-row>
          <swirl-table-cell>
            <swirl-checkbox swirl-aria-label="Select Doyle Stoltenberg" input-id="select-2" input-name="select-2">
          </swirl-table-cell>
          <swirl-table-cell>
            <swirl-text size="sm" weight="medium">Doyle Stoltenberg</swirl-text>
          </swirl-table-cell>
          <swirl-table-cell>
            <swirl-text size="sm" truncate>0987654321</swirl-text>
          </swirl-table-cell>
          <swirl-table-cell>
            <swirl-text size="sm"><swirl-link href="#" label="john.doe@flipapp.de"></swirl-link></swirl-text>
          </swirl-table-cell>
          <swirl-table-cell>
            <swirl-text size="sm">DE</swirl-text>
          </swirl-table-cell>
          <swirl-table-cell>
            <swirl-text size="sm" truncate>432</swirl-text>
          </swirl-table-cell>
          <swirl-table-cell>
            <swirl-text size="sm">24.11.2022 13:39</swirl-text>
          </swirl-table-cell>
          <swirl-table-cell>
            <swirl-tag label="Pending" intent="warning"></swirl-tag>
          </swirl-table-cell>
          <swirl-table-cell>
            <swirl-button hide-label icon="<swirl-icon-more-vertikal></swirl-icon-more-vertikal>" label="Options"></swirl-button>
          </swirl-table-cell>
        </swirl-table-row>
        <swirl-table-row highlighted>
          <swirl-table-cell>
            <swirl-checkbox checked="true" swirl-aria-label="Select Don Conroy" input-id="select-3" input-name="select-3">
          </swirl-table-cell>
          <swirl-table-cell>
            <swirl-text size="sm" weight="medium">Don Conroy</swirl-text>
          </swirl-table-cell>
          <swirl-table-cell>
            <swirl-text size="sm" truncate>5432167890</swirl-text>
          </swirl-table-cell>
          <swirl-table-cell>
            <swirl-text size="sm"><swirl-link href="#" label="don.conroy@flipapp.de"></swirl-link></swirl-text>
          </swirl-table-cell>
          <swirl-table-cell>
            <swirl-text size="sm">DE</swirl-text>
          </swirl-table-cell>
          <swirl-table-cell>
            <swirl-text size="sm" truncate>0</swirl-text>
          </swirl-table-cell>
          <swirl-table-cell>
            <swirl-text size="sm">-</swirl-text>
          </swirl-table-cell>
          <swirl-table-cell>
            <swirl-tag label="Pending" intent="warning"></swirl-tag>
          </swirl-table-cell>
          <swirl-table-cell>
            <swirl-button hide-label icon="<swirl-icon-more-vertikal></swirl-icon-more-vertikal>" label="Options"></swirl-button>
          </swirl-table-cell>
        </swirl-table-row>
        
      </swirl-table-row-group>
    </div>
  `;

  return element;
};

export const SwirlTable = Template.bind({});

SwirlTable.args = {
  caption: "A table displaying data.",
  label: "Table",
};
