import { newSpecPage } from "@stencil/core/testing";

import { FlipTableRowGroup } from "./flip-table-row-group";

describe("flip-table-row-group", () => {
  it("renders its label and content", async () => {
    const page = await newSpecPage({
      components: [FlipTableRowGroup],
      html: `<flip-table-row-group label="Label">Content</flip-table-row-group>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-table-row-group class="table-row-group" label="Label" role="rowgroup">
        <mock:shadow-root>
          <div class="table-row-group__header-row" role="row">
            <span aria-rowspan="0" class="table-row-group__label" role="rowheader">
              Label
            </span>
          </div>
          <slot></slot>
        </mock:shadow-root>
        Content
      </flip-table-row-group>
    `);
  });
});
