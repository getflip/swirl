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

/** Callbacks of the MutationObservers created, to report mutations by hand. */
let mutationCallbacks: ((mutations: Mutation[]) => void)[] = [];

(global as any).MutationObserver = class {
  constructor(callback: (mutations: Mutation[]) => void) {
    mutationCallbacks.push(callback);
  }
  disconnect() {}
  observe() {}
};

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
  });
});
