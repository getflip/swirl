import { newSpecPage } from "@stencil/core/testing";

import { SwirlTableRow } from "./swirl-table-row";

(global as any).IntersectionObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
};

describe("swirl-table-row", () => {
  it("renders its cells", async () => {
    const page = await newSpecPage({
      components: [SwirlTableRow],
      html: `<swirl-table-row><span>Cell</span></swirl-table-row>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-table-row class="table-row" role="row">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        <span>
          Cell
        </span>
      </swirl-table-row>
    `);
  });

  it("sets treegrid ARIA attributes", async () => {
    const page = await newSpecPage({
      components: [SwirlTableRow],
      html: `<swirl-table-row tree-level="2" tree-expandable tree-expanded tree-set-size="4" tree-pos-inset="3"></swirl-table-row>`,
    });

    expect(page.root.getAttribute("role")).toBe("row");
    expect(page.root.getAttribute("aria-level")).toBe("3");
    expect(page.root.getAttribute("aria-expanded")).toBe("true");
    expect(page.root.getAttribute("aria-setsize")).toBe("4");
    expect(page.root.getAttribute("aria-posinset")).toBe("3");
  });

  it("omits aria-expanded for leaf rows", async () => {
    const page = await newSpecPage({
      components: [SwirlTableRow],
      html: `<swirl-table-row tree-level="0" tree-set-size="2" tree-pos-inset="1"></swirl-table-row>`,
    });

    expect(page.root.getAttribute("aria-level")).toBe("1");
    expect(page.root.getAttribute("aria-expanded")).toBeNull();
  });
});
