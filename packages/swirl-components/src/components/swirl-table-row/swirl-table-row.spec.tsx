import { newSpecPage } from "@stencil/core/testing";

import { FlipTableRow } from "./swirl-table-row";

describe("flip-table-row", () => {
  it("renders its content and index", async () => {
    const page = await newSpecPage({
      components: [FlipTableRow],
      html: `<flip-table-row highlighted="true" index="0">Row</flip-table-row>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-table-row aria-rowindex="0" class="table-row table-row--highlighted" highlighted="true" index="0" role="row">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Row
      </flip-table-row>
    `);
  });
});
