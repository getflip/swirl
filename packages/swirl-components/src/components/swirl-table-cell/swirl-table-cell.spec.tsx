import { newSpecPage } from "@stencil/core/testing";

import { FlipTableCell } from "./swirl-table-cell";

describe("flip-table-cell", () => {
  it("renders its content", async () => {
    const page = await newSpecPage({
      components: [FlipTableCell],
      html: `<flip-table-cell>Cell</flip-table-cell>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-table-cell class="table-cell" role="cell">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Cell
      </flip-table-cell>
    `);
  });
});
