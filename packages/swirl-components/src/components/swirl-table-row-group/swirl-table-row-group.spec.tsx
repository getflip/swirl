import { newSpecPage } from "@stencil/core/testing";

import { SwirlTableRowGroup } from "./swirl-table-row-group";

describe("swirl-table-row-group", () => {
  it("renders its label and content", async () => {
    const page = await newSpecPage({
      components: [SwirlTableRowGroup],
      html: `<swirl-table-row-group label="Label">Content</swirl-table-row-group>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-table-row-group class="table-row-group" label="Label" role="rowgroup">
        <mock:shadow-root>
          <div class="table-row-group__header-row" role="row">
            <span aria-rowspan="0" class="table-row-group__label" role="rowheader">
              Label
            </span>
          </div>
          <slot></slot>
        </mock:shadow-root>
        Content
      </swirl-table-row-group>
    `);
  });
});
