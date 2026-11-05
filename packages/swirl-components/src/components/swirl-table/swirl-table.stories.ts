import { generateStoryElement } from "../../utils";
import Docs from "./swirl-table.mdx";

export default {
  argTypes: {
    dragDropHandle: {
      description:
        'CSS selector for the drag handle. Needs to be set when "enableDragDrop" is true. The handle should be a button.',
    },
  },
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
  const element = generateStoryElement(
    "swirl-table",
    args
  ) as HTMLSwirlTableElement;

  element.innerHTML = `
    <div slot="columns">
      <swirl-table-column sticky width="58px">
        <swirl-checkbox checked="indeterminate" swirl-aria-label="Select all" input-id="select" input-name="select">
        </swirl-checkbox><swirl-visually-hidden>Select</swirl-visually-hidden>
      </swirl-table-column>
      <swirl-table-column min-width="160px" sticky>User</swirl-table-column>
      <swirl-table-column>Drag</swirl-table-column>
      <swirl-table-column min-width="120px">User ID</swirl-table-column>
      <swirl-table-column min-width="200px" sortable sort="descending">Email</swirl-table-column>
      <swirl-table-column>Location</swirl-table-column>
      <swirl-table-column>Logins</swirl-table-column>
      <swirl-table-column>Latest login</swirl-table-column>
      <swirl-table-column>User status</swirl-table-column>
      <swirl-table-column sticky width="74px"><swirl-visually-hidden>Tools</swirl-visually-hidden></swirl-table-column>
    </div>
    <div slot="rows">
      <swirl-table-row id="1">
        <swirl-table-cell>
          <swirl-checkbox swirl-aria-label="Select Isabel Lakin" input-id="select-1" input-name="select-1">
        </swirl-table-cell>
        <swirl-table-cell>
          <swirl-text size="sm" weight="medium">Isabel Lakin</swirl-text>
        </swirl-table-cell>
        <swirl-table-cell>
          <swirl-button class="drag-handle" hide-label icon="<swirl-icon-drag-handle></swirl-icon-drag-handle>" label="Drag" variant="plain"></swirl-button>
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
        <swirl-table-row id="2">
          <swirl-table-cell>
            <swirl-checkbox swirl-aria-label="Select Doyle Stoltenberg" input-id="select-2" input-name="select-2">
          </swirl-table-cell>
          <swirl-table-cell>
            <swirl-text size="sm" weight="medium">Doyle Stoltenberg</swirl-text>
          </swirl-table-cell>
          <swirl-table-cell>
            <swirl-button class="drag-handle" hide-label icon="<swirl-icon-drag-handle></swirl-icon-drag-handle>" label="Drag" variant="plain"></swirl-button>
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
        <swirl-table-row highlighted id="3">
          <swirl-table-cell>
            <swirl-checkbox checked="true" swirl-aria-label="Select Don Conroy" input-id="select-3" input-name="select-3">
          </swirl-table-cell>
          <swirl-table-cell>
            <swirl-text size="sm" weight="medium">Don Conroy</swirl-text>
          </swirl-table-cell>
          <swirl-table-cell>
            <swirl-button class="drag-handle" hide-label icon="<swirl-icon-drag-handle></swirl-icon-drag-handle>" label="Drag" variant="plain"></swirl-button>
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
      </div>
  `;

  return element;
};

export const SwirlTable = Template.bind({});

SwirlTable.args = {
  caption: "A table displaying data.",
  dragDropHandle: ".drag-handle",
  enableDragDrop: true,
  label: "Table",
};

const firstNames = [
  "Isabel",
  "Doyle",
  "Don",
  "Amara",
  "Kenji",
  "Lena",
  "Mateo",
  "Priya",
  "Sven",
  "Zoe",
];

const lastNames = [
  "Lakin",
  "Stoltenberg",
  "Conroy",
  "Okafor",
  "Tanaka",
  "Schmidt",
  "Rossi",
  "Patel",
  "Larsen",
  "Moreau",
  "Novak",
];

const statuses = [
  { intent: "success", label: "Active" },
  { intent: "warning", label: "Pending" },
  { intent: "critical", label: "Blocked" },
];

/**
 * Builds the row for an index. Content depends on the index only, so a row
 * drawn again after scrolling looks the same. Every 7th row has two lines of
 * text, so the rows have different heights.
 */
const createVirtualizedRow = (index: number, idPrefix: string) => {
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[(index * 7) % lastNames.length];
  const name = `${firstName} ${lastName}`;
  const email = `${firstName}.${lastName}.${index}@flipapp.de`.toLowerCase();
  const status = statuses[index % statuses.length];
  const isTall = index % 7 === 0;
  const popoverId = `${idPrefix}-popover-${index}`;

  const row = document.createElement("swirl-table-row");

  row.id = `${idPrefix}-row-${index}`;
  row.dataset.index = String(index);
  row.innerHTML = `
    <swirl-table-cell>
      <swirl-text size="sm" truncate>${index}</swirl-text>
    </swirl-table-cell>
    <swirl-table-cell>
      <swirl-stack>
        <swirl-text size="sm" weight="medium">${name}</swirl-text>
        ${
          isTall
            ? `<swirl-text color="subdued" size="sm">Taller row with a second line of text</swirl-text>`
            : ""
        }
      </swirl-stack>
    </swirl-table-cell>
    <swirl-table-cell>
      <swirl-text size="sm"><swirl-link href="#" label="${email}"></swirl-link></swirl-text>
    </swirl-table-cell>
    <swirl-table-cell>
      <swirl-tag label="${status.label}" intent="${status.intent}"></swirl-tag>
    </swirl-table-cell>
    <swirl-table-cell>
      <swirl-popover-trigger hide-popover-when-invisible="false" swirl-popover="${popoverId}">
        <swirl-button hide-label icon="<swirl-icon-more-vertikal></swirl-icon-more-vertikal>" label="Options for ${name}"></swirl-button>
      </swirl-popover-trigger>
      <swirl-popover disable-scroll-lock id="${popoverId}" label="Options for ${name}">
        <swirl-action-list>
          <swirl-action-list-item icon="<swirl-icon-edit></swirl-icon-edit>" label="Edit"></swirl-action-list-item>
          <swirl-action-list-item icon="<swirl-icon-delete></swirl-icon-delete>" intent="critical" label="Delete"></swirl-action-list-item>
        </swirl-action-list>
      </swirl-popover>
    </swirl-table-cell>
  `;

  return row;
};

/**
 * Renders the rows named by `visibleRowsChange`, tracked by id. Rows that
 * stay drawn are not moved, so focus and open popovers survive scrolling.
 * Rows with an open popover are kept drawn via `keepRowsRendered`. The
 * popovers stay open while scrolled out of view and don't lock scrolling, so
 * kept rows can be tested by scrolling away from an open menu.
 */
const createVirtualizedTable = (args, idPrefix: string) => {
  const table = generateStoryElement(
    "swirl-table",
    args
  ) as HTMLSwirlTableElement;

  table.innerHTML = `
    <div slot="columns">
      <swirl-table-column width="80px">#</swirl-table-column>
      <swirl-table-column min-width="200px">Name</swirl-table-column>
      <swirl-table-column min-width="240px">Email</swirl-table-column>
      <swirl-table-column min-width="120px">Status</swirl-table-column>
      <swirl-table-column sticky width="74px"><swirl-visually-hidden>Options</swirl-visually-hidden></swirl-table-column>
    </div>
    <div slot="rows"></div>
  `;

  const rowsContainer = table.querySelector<HTMLElement>('[slot="rows"]');
  const rowsByIndex = new Map<number, HTMLElement>();
  const openPopoverRows = new Set<number>();

  const renderRows = (indexes: number[]) => {
    const wantedSet = new Set(indexes);

    // Remove rows first, so the rows that stay are never moved.
    rowsByIndex.forEach((row, index) => {
      if (!wantedSet.has(index)) {
        row.remove();
        rowsByIndex.delete(index);
      }
    });

    let nextRow = rowsContainer.firstElementChild;

    indexes.forEach((index) => {
      const existingRow = rowsByIndex.get(index);

      if (existingRow) {
        nextRow = existingRow.nextElementSibling;
        return;
      }

      const row = createVirtualizedRow(index, idPrefix);

      rowsByIndex.set(index, row);
      rowsContainer.insertBefore(row, nextRow);
    });
  };

  const getRowIndexOf = (target: EventTarget) =>
    Number(
      (target as HTMLElement).closest("swirl-table-row")?.dataset.index ?? NaN
    );

  const toggleKeptRow = (event: Event, isKept: boolean) => {
    const index = getRowIndexOf(event.target);

    if (Number.isNaN(index)) {
      return;
    }

    if (isKept) {
      openPopoverRows.add(index);
    } else {
      openPopoverRows.delete(index);
    }

    table.keepRowsRendered = [...openPopoverRows];
  };

  table.addEventListener("visibleRowsChange", (event: CustomEvent) => {
    renderRows(event.detail.indexes);
  });

  table.addEventListener("popoverOpen", (event) => toggleKeptRow(event, true));
  table.addEventListener("popoverClose", (event) =>
    toggleKeptRow(event, false)
  );

  // Without virtualization, render all rows for comparison.
  if (!args.isVirtualized) {
    renderRows(Array.from({ length: args.rowCount ?? 0 }, (_, index) => index));
  }

  return table;
};

const virtualizedArgTypes = {
  estimatedRowHeight: {
    control: { type: "number" },
    description: "Height in px assumed for rows not drawn yet.",
  },
  isVirtualized: {
    control: { type: "boolean" },
    description: "Draws only the rows near the visible area.",
  },
  overscan: {
    control: { type: "number" },
    description: "Number of extra rows drawn above and below the visible ones.",
  },
  rowCount: {
    control: { type: "number" },
    description: "Total number of rows when virtualized.",
  },
};

const virtualizedArgs = {
  emptyStateLabel: "No rows.",
  estimatedRowHeight: 56,
  isVirtualized: true,
  label: "Virtualized table",
  overscan: 10,
  rowCount: 1000,
};

const VirtualizedTemplate = (args) => {
  const scrollContainer = document.createElement("div");
  const table = createVirtualizedTable(args, "virtualized");

  scrollContainer.style.height = "500px";
  scrollContainer.style.overflowY = "auto";
  scrollContainer.style.border =
    "1px solid var(--s-border-default, currentColor)";
  scrollContainer.append(table);

  return scrollContainer;
};

export const Virtualized = VirtualizedTemplate.bind({});

Virtualized.args = { ...virtualizedArgs };
Virtualized.argTypes = virtualizedArgTypes;

const VirtualizedWindowScrollTemplate = (args) =>
  createVirtualizedTable(args, "virtualized-window-scroll");

export const VirtualizedWindowScroll = VirtualizedWindowScrollTemplate.bind({});

VirtualizedWindowScroll.args = { ...virtualizedArgs };
VirtualizedWindowScroll.argTypes = virtualizedArgTypes;
