import { newSpecPage, SpecPage } from "@stencil/core/testing";

import { SwirlTable } from "./swirl-table";

(global as any).IntersectionObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
};

/** The fields of a MutationRecord swirl-table reads. */
type Mutation = {
  type: MutationRecordType;
  addedNodes: Node[];
  removedNodes: Node[];
};

type MutationCallback = (mutations: Mutation[]) => void;

/** Callbacks of the MutationObservers created, to report mutations by hand. */
let mutationCallbacks: MutationCallback[] = [];

/** The callback of the MutationObserver that watches each element. */
const mutationCallbackByTarget = new Map<Node, MutationCallback>();

(global as any).MutationObserver = class {
  constructor(private callback: MutationCallback) {
    mutationCallbacks.push(callback);
  }
  disconnect() {}
  observe(target: Node) {
    mutationCallbackByTarget.set(target, this.callback);
  }
};

/** Waits past the 16 ms debounce of the table's layout. */
const waitForLayout = () => new Promise((resolve) => setTimeout(resolve, 20));

/**
 * Adds columns whose widths come from `getWidths`. mock-doc has no layout, so
 * the widths are what the table measures.
 */
function addColumns(table: HTMLElement, getWidths: () => number[]) {
  const container = table.querySelector('[slot="columns"]');
  const count = getWidths().length;

  container.innerHTML = "<swirl-table-column></swirl-table-column>".repeat(
    count
  );

  container.querySelectorAll("swirl-table-column").forEach((column, index) => {
    column.getBoundingClientRect = () =>
      ({ width: getWidths()[index] } as DOMRect);
  });

  return count;
}

/** Adds a row with one cell per column. */
function addRow(table: HTMLElement, columnCount: number, index?: number) {
  const row = document.createElement("swirl-table-row");

  if (index !== undefined) {
    row.setAttribute("data-index", String(index));
  }

  row.innerHTML = "<swirl-table-cell></swirl-table-cell>".repeat(columnCount);
  table.querySelector('[slot="rows"]').append(row);

  return row;
}

/** The flex each cell of the row got from the table's layout. */
function cellFlex(row: HTMLElement) {
  return Array.from(
    row.querySelectorAll<HTMLElement>("swirl-table-cell"),
    (cell) => cell.style.flex
  );
}

describe("swirl-table", () => {
  it("renders its columns and rows", async () => {
    const page = await newSpecPage({
      components: [SwirlTable],
      html: `
        <swirl-table caption="Caption" label="Label">
          <div slot="columns">
            <span role="columnheader">Column 1</span>
            <span role="columnheader">Column 2</span>
          </div>
          <div slot="rows">
            <div role="row">
              <span role="cell">1</span>
              <span role="cell">2</span>
            </div>
          </div>
        </swirl-table>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-table caption=\"Caption\" label=\"Label\">
        <div class=\"table\">
          <div class=\"table__container\" tabIndex=\"-1\">
            <div aria-describedby=\"caption\" aria-label=\"Label\" class=\"table__table\" role=\"table\">
              <swirl-visually-hidden>
                <div id=\"caption\">
                  Caption
                </div>
              </swirl-visually-hidden>
              <div role=\"rowgroup\">
                <div class=\"table__header\" role=\"row\">
                  <div slot=\"columns\">
                    <span role=\"columnheader\">
                      Column 1
                    </span>
                    <span role=\"columnheader\">
                      Column 2
                    </span>
                  </div>
                </div>
              </div>
              <div class=\"table__body\">
                <div slot=\"rows\">
                  <div role=\"row\">
                    <span role=\"cell\">
                      1
                    </span>
                    <span role=\"cell\">
                      2
                    </span>
                  </div>
                </div>
                <div class="table__empty-row" role="row" style="width: undefinedpx;">
                  <div aria-colspan="0" class="table__empty-row-cell" role="cell">
                    <swirl-text align="center" size="sm">
                      No results found.
                    </swirl-text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swirl-table>
    `);
  });

  describe("layout", () => {
    async function setupTable() {
      const page = await newSpecPage({
        components: [SwirlTable],
        html: `
          <swirl-table label="Users">
            <div slot="columns"></div>
            <div slot="rows"></div>
          </swirl-table>
        `,
      });

      return page.root as HTMLSwirlTableElement;
    }

    it("lays out a row that loads while the table lays out", async () => {
      const table = await setupTable();
      const columnCount = addColumns(table, () => [100, 200]);
      await waitForLayout();

      // Each row calls rerender() when it loads.
      addRow(table, columnCount);
      await table.rerender();
      const secondRow = addRow(table, columnCount);
      await table.rerender();
      await waitForLayout();

      expect(cellFlex(secondRow)).toEqual(["0 0 100px", "0 0 200px"]);
    });

    it("sizes every cell to its column, though sizing cells moves the columns", async () => {
      const table = await setupTable();

      // The table is as wide as its widest row: while some cells are sized
      // and others aren't, the columns are 10px wider.
      const isPartlySized = () => {
        const flex = Array.from(
          table.querySelectorAll<HTMLElement>("swirl-table-cell"),
          (cell) => cell.style.flex
        );

        return flex.some(Boolean) && !flex.every(Boolean);
      };
      const columnCount = addColumns(table, () =>
        isPartlySized() ? [110, 210, 310] : [100, 200, 300]
      );
      const rows = [addRow(table, columnCount), addRow(table, columnCount)];

      await table.rerender();
      await waitForLayout();

      rows.forEach((row) =>
        expect(cellFlex(row)).toEqual(["0 0 100px", "0 0 200px", "0 0 300px"])
      );
    });
  });

  describe("with virtualized rows", () => {
    const rowHeight = 56;

    beforeEach(() => {
      mutationCallbacks = [];
      (global as any).Window = window.constructor;
      (global as any).ResizeObserver = window.ResizeObserver;
      window.scrollY = 0;
    });

    async function setup(rowCount: number) {
      const page = await newSpecPage({
        components: [SwirlTable],
        html: `
          <swirl-table label="Users">
            <div slot="columns"></div>
            <div slot="rows"></div>
          </swirl-table>
        `,
      });
      const table = page.root as HTMLSwirlTableElement;
      const emitted: number[][] = [];

      table.addEventListener("virtualizationRowsChange", (event: CustomEvent) =>
        emitted.push(event.detail.indexes)
      );

      // mock-doc has no layout: keep the rows' top where scrolling puts it.
      table.querySelector<HTMLElement>(".table__body").getBoundingClientRect =
        () => ({ top: -window.scrollY } as DOMRect);

      // Set after load, which also covers turning virtualization on later.
      table.enableVirtualization = true;
      table.virtualizationRowCount = rowCount;
      await settle(page);

      /** Renders the rows from the last event, like a consumer does. */
      const renderRows = () => {
        const container = table.querySelector('[slot="rows"]');

        container.innerHTML = emitted
          .at(-1)
          .map(
            (index) =>
              `<swirl-table-row data-index="${index}"><button>Edit</button></swirl-table-row>`
          )
          .join("");
      };

      const scrollToRow = async (index: number) => {
        window.scrollY = index * rowHeight;
        window.dispatchEvent(new Event("scroll"));
        await settle(page);
      };

      return {
        lastIndexes: () => emitted.at(-1),
        page,
        renderRows,
        scrollToRow,
        table,
      };
    }

    /** Waits for the render and the event, which is emitted in a microtask. */
    async function settle(page: SpecPage) {
      await page.waitForChanges();
      await Promise.resolve();
    }

    it("emits the rows to render", async () => {
      const { lastIndexes } = await setup(3);

      expect(lastIndexes()).toEqual([0, 1, 2]);
    });

    it("emits no rows when the row count drops to 0", async () => {
      const { lastIndexes, page, renderRows, table } = await setup(3);

      renderRows();
      table.virtualizationRowCount = 0;
      await settle(page);

      expect(lastIndexes()).toEqual([]);
    });

    it("gives screen readers the full row count", async () => {
      const { table } = await setup(1000);

      expect(
        table.querySelector('[role="table"]').getAttribute("aria-rowcount")
      ).toBe("1001");
      expect(
        table.querySelector(".table__header").getAttribute("aria-rowindex")
      ).toBe("1");
    });

    it("stops virtualizing when turned off", async () => {
      const { page, table } = await setup(1000);
      const body = table.querySelector<HTMLElement>(".table__body");

      expect(body.style.paddingBottom).not.toBe("");

      table.enableVirtualization = false;
      await settle(page);

      expect(body.style.paddingBottom).toBe("");
      expect(
        table.querySelector('[role="table"]').hasAttribute("aria-rowcount")
      ).toBe(false);
    });

    it("doesn't show the empty state before rows are rendered", async () => {
      const page = await newSpecPage({
        components: [SwirlTable],
        html: `
          <swirl-table label="Users" enable-virtualization virtualization-row-count="1000">
            <div slot="columns"></div>
            <div slot="rows"></div>
          </swirl-table>
        `,
      });
      await settle(page);

      expect(page.root.querySelector(".table--show-empty-state")).toBeNull();
    });

    it("switches to its scroll container once more rows make it overflow", async () => {
      // mock-doc has no layout: read overflow-y from the inline style.
      jest
        .spyOn(global as any, "getComputedStyle")
        .mockImplementation((el: HTMLElement) => ({
          overflowY: el.style.overflowY || "visible",
        }));

      const page = await newSpecPage({
        components: [SwirlTable],
        html: `
          <div class="box" style="overflow-y: auto">
            <swirl-table label="Users">
              <div slot="columns"></div>
              <div slot="rows"></div>
            </swirl-table>
          </div>
        `,
      });
      const box = page.body.querySelector<HTMLElement>(".box");
      const table = page.body.querySelector("swirl-table");
      let overflows = false;

      Object.defineProperty(box, "scrollTop", { value: 0 });
      Object.defineProperty(box, "clientHeight", { value: 100 });
      Object.defineProperty(box, "scrollHeight", {
        get: () => (overflows ? 200 : 100),
      });

      // The rows fit, so the table falls back to the window.
      table.enableVirtualization = true;
      table.virtualizationRowCount = 1;
      await settle(page);

      overflows = true;
      table.virtualizationRowCount = 1000;
      await settle(page);

      expect(page.rootInstance.virtualizer.scrollElement).toBe(box);

      jest.restoreAllMocks();
    });

    it("keeps the focused row rendered when it scrolls out of view", async () => {
      const { lastIndexes, page, renderRows, scrollToRow, table } = await setup(
        1000
      );

      renderRows();
      table
        .querySelector('swirl-table-row[data-index="3"] button')
        .dispatchEvent(new Event("focusin", { bubbles: true }));
      await scrollToRow(500);
      await settle(page);

      expect(lastIndexes()).toContain(3);
      expect(lastIndexes()).not.toContain(4);
    });

    it("keeps the focused row rendered when its data-index changes", async () => {
      const { lastIndexes, page, renderRows, scrollToRow, table } = await setup(
        1000
      );

      renderRows();
      const row = table.querySelector<HTMLElement>(
        'swirl-table-row[data-index="3"]'
      );
      row
        .querySelector("button")
        .dispatchEvent(new Event("focusin", { bubbles: true }));

      // A row was inserted above the focused one.
      row.setAttribute("data-index", "4");
      // mock-doc doesn't support :focus-within.
      const querySelector = table.querySelector.bind(table);
      jest
        .spyOn(table, "querySelector")
        .mockImplementation((selector: string) =>
          selector.includes(":focus-within") ? row : querySelector(selector)
        );
      mutationCallbacks.forEach((callback) =>
        callback([{ type: "attributes", addedNodes: [], removedNodes: [] }])
      );
      await scrollToRow(500);
      await settle(page);

      expect(lastIndexes()).toContain(4);
      expect(lastIndexes()).not.toContain(3);
    });

    it("lays out rows added while scrolling, without a call to rerender()", async () => {
      const { table } = await setup(1000);
      const columnCount = addColumns(table, () => [100, 200]);
      await waitForLayout();

      const row = addRow(table, columnCount, 0);
      // mock-doc doesn't support :focus-within.
      const querySelector = table.querySelector.bind(table);
      jest
        .spyOn(table, "querySelector")
        .mockImplementation((selector: string) =>
          selector.includes(":focus-within") ? null : querySelector(selector)
        );
      mutationCallbackByTarget.get(table.querySelector(".table__body"))([
        { type: "childList", addedNodes: [row], removedNodes: [] },
      ]);
      await waitForLayout();

      expect(cellFlex(row)).toEqual(["0 0 100px", "0 0 200px"]);
    });
  });
});
