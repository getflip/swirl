import { newSpecPage } from "@stencil/core/testing";

import { SwirlTableCell } from "./swirl-table-cell";

describe("swirl-table-cell", () => {
  it("renders its content", async () => {
    const page = await newSpecPage({
      components: [SwirlTableCell],
      html: `<swirl-table-cell>Cell</swirl-table-cell>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-table-cell class="table-cell" role="cell">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Cell
      </swirl-table-cell>
    `);
  });
});
