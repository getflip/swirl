import { newSpecPage } from "@stencil/core/testing";

import { SwirlTableColumn } from "./swirl-table-column";

describe("swirl-table-column", () => {
  it("renders its label and sorting", async () => {
    const page = await newSpecPage({
      components: [SwirlTableColumn],
      html: `<swirl-table-column sortable sort="ascending">Label</swirl-table-column>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-table-column aria-sort="ascending" class="table-column" role="columnheader" sortable sort="ascending" style="min-width: fit-content;">
        <mock:shadow-root>
          <span>
            <slot></slot>
          </span>
          <span class="table-column__sort-indicator">
            <swirl-icon-arrow-upward aria-hidden="true" size="20"></swirl-icon-arrow-upward>
          </span>
        </mock:shadow-root>
        Label
      </swirl-table-column>
    `);
  });
});
