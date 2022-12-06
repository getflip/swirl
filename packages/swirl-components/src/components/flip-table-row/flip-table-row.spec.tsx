import { newSpecPage } from "@stencil/core/testing";

import { FlipTableRow } from "./flip-table-row";

describe("flip-table-row", () => {
  it("renders its content and index", async () => {
    const page = await newSpecPage({
      components: [FlipTableRow],
      html: `<flip-table-row index="0">Row</flip-table-row>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-table-row aria-rowindex="0" class="table-row" index="0" role="row">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Row
      </flip-table-row>
    `);
  });
});
