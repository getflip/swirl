import { newSpecPage } from "@stencil/core/testing";

import { FlipTableColumn } from "./flip-table-column";

describe("flip-table-column", () => {
  it("renders its label and sorting", async () => {
    const page = await newSpecPage({
      components: [FlipTableColumn],
      html: `<flip-table-column sortable sort="ascending">Label</flip-table-column>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-table-column aria-sort="ascending" class="table-column" role="columnheader" sortable sort="ascending" style="min-width: fit-content;">
        <mock:shadow-root>
          <span>
            <slot></slot>
          </span>
          <span class="table-column__sort-indicator">
            <flip-icon-arrow-upward aria-hidden="true" size="20"></flip-icon-arrow-upward>
          </span>
        </mock:shadow-root>
        Label
      </flip-table-column>
    `);
  });
});
