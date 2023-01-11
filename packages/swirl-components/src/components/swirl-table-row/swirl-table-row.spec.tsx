import { newSpecPage } from "@stencil/core/testing";

import { SwirlTableRow } from "./swirl-table-row";

describe("swirl-table-row", () => {
  it("renders its content and index", async () => {
    const page = await newSpecPage({
      components: [SwirlTableRow],
      html: `<swirl-table-row highlighted="true" index="0">Row</swirl-table-row>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-table-row aria-rowindex="0" class="table-row table-row--highlighted" highlighted="true" index="0" role="row">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Row
      </swirl-table-row>
    `);
  });
});
