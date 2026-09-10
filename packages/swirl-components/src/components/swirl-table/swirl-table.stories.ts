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

type TreeNode = {
  id: string;
  label: string;
  description: string;
  members: string;
  status: "Active" | "Pending";
  children?: TreeNode[];
};

const TREE_NODES: TreeNode[] = [
  {
    id: "engineering",
    label: "Engineering",
    description: "Platform and product delivery",
    members: "128",
    status: "Active",
    children: [
      {
        id: "platform",
        label: "Platform",
        description: "Shared infrastructure",
        members: "42",
        status: "Active",
        children: [
          {
            id: "frontend",
            label: "Frontend",
            description: "Web applications",
            members: "18",
            status: "Active",
            children: [
              {
                id: "design-system",
                label: "Design System",
                description: "Swirl components",
                members: "7",
                status: "Active",
                children: [
                  {
                    id: "tokens",
                    label: "Tokens",
                    description: "Color, space, type",
                    members: "2",
                    status: "Active",
                  },
                  {
                    id: "components",
                    label: "Components",
                    description: "Web component library",
                    members: "4",
                    status: "Active",
                    children: [
                      {
                        id: "buttons",
                        label: "Buttons",
                        description: "Leaf at level 5",
                        members: "1",
                        status: "Pending",
                      },
                    ],
                  },
                  {
                    id: "icons",
                    label: "Icons",
                    description: "Icon set",
                    members: "1",
                    status: "Active",
                  },
                ],
              },
              {
                id: "web-app",
                label: "Web App",
                description: "Closed parent",
                members: "11",
                status: "Pending",
                children: [
                  {
                    id: "web-app-core",
                    label: "Core",
                    description: "Hidden until expanded",
                    members: "6",
                    status: "Active",
                  },
                ],
              },
            ],
          },
          {
            id: "backend",
            label: "Backend",
            description: "Closed parent",
            members: "16",
            status: "Active",
            children: [
              {
                id: "api",
                label: "API",
                description: "Hidden until expanded",
                members: "9",
                status: "Active",
              },
            ],
          },
        ],
      },
      {
        id: "product",
        label: "Product",
        description: "Leaf sibling of Platform",
        members: "9",
        status: "Active",
      },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    description: "Closed root",
    members: "24",
    status: "Pending",
    children: [
      {
        id: "brand",
        label: "Brand",
        description: "Hidden until expanded",
        members: "6",
        status: "Active",
      },
    ],
  },
  {
    id: "legal",
    label: "Legal",
    description: "Leaf at the root",
    members: "5",
    status: "Active",
  },
];

type FlatTreeRow = TreeNode & {
  level: number;
  expandable: boolean;
  expanded: boolean;
  setSize: number;
  posInset: number;
};

const flattenVisibleTree = (
  nodes: TreeNode[],
  expandedIds: Set<string>,
  level = 0
): FlatTreeRow[] =>
  nodes.flatMap((node, index) => {
    const expandable = Boolean(node.children?.length);
    const expanded = expandable && expandedIds.has(node.id);
    const row: FlatTreeRow = {
      ...node,
      level,
      expandable,
      expanded,
      setSize: nodes.length,
      posInset: index + 1,
    };

    return expanded
      ? [row, ...flattenVisibleTree(node.children, expandedIds, level + 1)]
      : [row];
  });

const collectDescendantIds = (node: TreeNode): string[] =>
  (node.children ?? []).flatMap((child) => [
    child.id,
    ...collectDescendantIds(child),
  ]);

const findNode = (nodes: TreeNode[], id: string): TreeNode | undefined => {
  for (const node of nodes) {
    if (node.id === id) {
      return node;
    }

    const match = node.children && findNode(node.children, id);

    if (match) {
      return match;
    }
  }

  return undefined;
};

const renderTreeRow = (row: FlatTreeRow, withSelection: boolean) => `
  <swirl-table-row
    id="${row.id}"
    tree-level="${row.level}"
    ${row.expandable ? "tree-expandable" : ""}
    ${row.expanded ? "tree-expanded" : ""}
    tree-set-size="${row.setSize}"
    tree-pos-inset="${row.posInset}"
  >
    ${
      withSelection
        ? `<swirl-table-cell>
          <swirl-checkbox swirl-aria-label="Select ${row.label}" input-id="select-${row.id}" input-name="select-${row.id}">
        </swirl-table-cell>`
        : ""
    }
    <swirl-table-cell
      tree
      level="${row.level}"
      ${row.expandable ? "expandable" : ""}
      ${row.expanded ? "expanded" : ""}
      label="${row.label}"
    >
      <swirl-stack spacing="0">
        <swirl-link href="#" label="${row.label}"></swirl-link>
        <swirl-text color="subdued" size="sm">${row.description}</swirl-text>
      </swirl-stack>
    </swirl-table-cell>
    <swirl-table-cell>
      <swirl-text size="sm">${row.members}</swirl-text>
    </swirl-table-cell>
    <swirl-table-cell>
      <swirl-tag label="${row.status}" intent="${
  row.status === "Active" ? "success" : "warning"
}"></swirl-tag>
    </swirl-table-cell>
  </swirl-table-row>
`;

const createTreeTable = (withSelection: boolean) => {
  const element = generateStoryElement("swirl-table", {
    caption: "A hierarchical table rendered as a treegrid.",
    label: "Groups",
    tree: true,
  }) as HTMLSwirlTableElement;

  const expandedIds = new Set([
    "engineering",
    "platform",
    "frontend",
    "design-system",
    "components",
  ]);
  const selectedIds = new Set<string>();
  let applyingSelection = false;

  element.innerHTML = `
    <div slot="columns">
      ${
        withSelection
          ? `<swirl-table-column sticky width="58px">
        <swirl-checkbox swirl-aria-label="Select all" input-id="select-all" input-name="select-all">
        </swirl-checkbox><swirl-visually-hidden>Select</swirl-visually-hidden>
      </swirl-table-column>`
          : ""
      }
      <swirl-table-column min-width="280px" sticky>Tree</swirl-table-column>
      <swirl-table-column min-width="100px">Members</swirl-table-column>
      <swirl-table-column min-width="120px">Status</swirl-table-column>
    </div>
    <div slot="rows"></div>
  `;

  const rowsContainer = element.querySelector('[slot="rows"]') as HTMLElement;

  const applySelection = () => {
    if (!withSelection) {
      return;
    }

    applyingSelection = true;

    element.querySelectorAll("swirl-checkbox").forEach((checkbox) => {
      const row = checkbox.closest("swirl-table-row");

      if (row) {
        (checkbox as HTMLSwirlCheckboxElement).checked = selectedIds.has(
          row.id
        );
      }
    });

    applyingSelection = false;
  };

  const renderRows = () => {
    const rows = flattenVisibleTree(TREE_NODES, expandedIds);

    rowsContainer.innerHTML = rows
      .map((row) => renderTreeRow(row, withSelection))
      .join("");

    applySelection();
  };

  element.addEventListener(
    "toggle",
    (event: CustomEvent<{ expanded: boolean }>) => {
      const row = (event.target as HTMLElement)?.closest("swirl-table-row");

      if (!row?.id) {
        return;
      }

      if (event.detail.expanded) {
        expandedIds.add(row.id);
      } else {
        expandedIds.delete(row.id);
      }

      renderRows();
    }
  );

  if (withSelection) {
    element.addEventListener("valueChange", (event: CustomEvent<boolean>) => {
      if (applyingSelection) {
        return;
      }

      const checkbox = event.target as HTMLSwirlCheckboxElement;
      const row = checkbox.closest("swirl-table-row");
      const node = row ? findNode(TREE_NODES, row.id) : undefined;

      if (!node) {
        return;
      }

      const ids = [node.id, ...collectDescendantIds(node)];

      ids.forEach((id) => {
        if (event.detail) {
          selectedIds.add(id);
        } else {
          selectedIds.delete(id);
        }
      });

      applySelection();
    });
  }

  renderRows();

  return element;
};

export const TreeView = () => createTreeTable(false);

TreeView.parameters = {
  docs: {
    description: {
      story:
        "Flat sibling rows with computed indent. The consumer owns expand state and which rows are visible.",
    },
  },
};

export const TreeViewWithSelection = () => createTreeTable(true);

TreeViewWithSelection.parameters = {
  docs: {
    description: {
      story:
        "Tree cells coexist with row-selection checkboxes. Descendant selection is owned by the consumer, not the table primitive.",
    },
  },
};
