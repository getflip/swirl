import { newSpecPage } from "@stencil/core/testing";

import { SwirlTable } from "./swirl-table";

describe("swirl-table", () => {
  it("renders its columns and rows", async () => {
    const page = await newSpecPage({
      components: [SwirlTable],
      html: `
        <swirl-table caption="Caption" label="Label">
          <div slot="columns">
            <span role="columnheader">Column 1</span>
            <span role="columnheader">Column 2</span>
          </div>
          <div slot="rows">
            <div role="row">
              <span role="cell">1</span>
              <span role="cell">2</span>
            </div>
          </div>
        </swirl-table>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-table caption="Caption" label="Label">
        <mock:shadow-root>
          <div class="table">
            <div class="table__container">
              <div aria-describedby="caption" aria-label="Label" class="table__table" role="table">
                <swirl-visually-hidden>
                  <div id="caption">
                    Caption
                  </div>
                </swirl-visually-hidden>
                <div role="rowgroup">
                  <div class="table__header" role="row">
                    <slot name="columns"></slot>
                  </div>
                </div>
                <div class="table__body">
                  <slot name="rows"></slot>
                </div>
              </div>
            </div>
          </div>
        </mock:shadow-root>
        <div slot="columns">
          <span role="columnheader">
            Column 1
          </span>
          <span role="columnheader">
            Column 2
          </span>
        </div>
        <div slot="rows">
          <div role="row">
            <span role="cell">
              1
            </span>
            <span role="cell">
              2
            </span>
          </div>
        </div>
      </swirl-table>
    `);
  });
});
