import { newSpecPage } from "@stencil/core/testing";

import { FlipActionListItem } from "./flip-action-list-item";

describe("flip-action-list-item", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [FlipActionListItem],
      html: `<flip-action-list-item></flip-action-list-item>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-action-list-item>
        <mock:shadow-root>
          <button class="action-list-item action-list-item--intent-default action-list-item--size-m" role="menuitem" tabindex="-1" type="button">
            <span class="action-list-item__label-container">
              <span class="action-list-item__label"></span>
            </span>
          </button>
        </mock:shadow-root>
      </flip-action-list-item>
    `);
  });
});
