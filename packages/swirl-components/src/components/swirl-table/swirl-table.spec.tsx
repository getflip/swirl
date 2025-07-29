import { newSpecPage } from "@stencil/core/testing";

import { SwirlTable } from "./swirl-table";

(global as any).IntersectionObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
};

(global as any).MutationObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
};

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
      <swirl-table caption=\"Caption\" label=\"Label\">
        <div class=\"table\">
          <div class=\"table__container\" tabIndex=\"-1\">
            <div aria-describedby=\"caption\" aria-label=\"Label\" class=\"table__table\" role=\"table\">
              <swirl-visually-hidden>
                <div id=\"caption\">
                  Caption
                </div>
              </swirl-visually-hidden>
              <div role=\"rowgroup\">
                <div class=\"table__header\" role=\"row\">
                  <div slot=\"columns\">
                    <span role=\"columnheader\">
                      Column 1
                    </span>
                    <span role=\"columnheader\">
                      Column 2
                    </span>
                  </div>
                </div>
              </div>
              <div class=\"table__body\">
                <div slot=\"rows\">
                  <div role=\"row\">
                    <span role=\"cell\">
                      1
                    </span>
                    <span role=\"cell\">
                      2
                    </span>
                  </div>
                </div>
                <div class="table__empty-row" role="row" style="width: undefinedpx;">
                  <div aria-colspan="0" class="table__empty-row-cell" role="cell">
                    <swirl-text align="center" size="sm">
                      No results found.
                    </swirl-text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swirl-table>
    `);
  });
});
