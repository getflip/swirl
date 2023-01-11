import { newSpecPage } from "@stencil/core/testing";

import { FlipTable } from "./swirl-table";

describe("flip-table", () => {
  it("renders its columns and rows", async () => {
    const page = await newSpecPage({
      components: [FlipTable],
      html: `
        <flip-table caption="Caption" label="Label">
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
        </flip-table>
      `,
    });

    expect(page.root).toEqualHtml(`
      <flip-table caption="Caption" label="Label">
        <mock:shadow-root>
          <div class="table">
            <div class="table__container">
              <div aria-describedby="caption" aria-label="Label" class="table__table" role="table">
                <flip-visually-hidden>
                  <div id="caption">
                    Caption
                  </div>
                </flip-visually-hidden>
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
      </flip-table>
    `);
  });
});
