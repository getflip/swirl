import { newSpecPage } from "@stencil/core/testing";

import { FlipTableColumn } from "./flip-table-column";

describe("flip-table-column", () => {
  it("renders its label and sorting", async () => {
    const page = await newSpecPage({
      components: [FlipTableColumn],
      html: `<flip-table-column sort="ascending">Label</flip-table-column>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-table-column aria-sort="ascending" class="table-column" role="columnheader" sort="ascending" style="min-width: 40px;">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Label
      </flip-table-column>
    `);
  });
});
