import { newSpecPage } from "@stencil/core/testing";

import { FlipOptionListItem } from "./flip-option-list-item";

describe("flip-option-list-item", () => {
  it("renders with label and icon", async () => {
    const page = await newSpecPage({
      components: [FlipOptionListItem],
      html: `<flip-option-list-item
              icon="<flip-icon-mention></flip-icon-mention>"
              label="Option List Item"
              selected="true"
              disabled="false"
              context="single-select"
              value="Value">
            </flip-option-list-item>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-option-list-item context="single-select" disabled="false" icon="<flip-icon-mention></flip-icon-mention>" label="Option List Item" selected="true" value="Value">
        <mock:shadow-root>
          <div aria-selected="true" class="option-list-item option-list-item--context-single-select option-list-item--selected" role="option">
            <span class="option-list-item__icon">
              <flip-icon-mention size="24"></flip-icon-mention>
            </span>
            <span class="option-list-item__label">
              Option List Item
            </span>
            <span class="option-list-item__selection-icon">
              <flip-icon-check-small size="24"></flip-icon-check-small>
            </span>
          </div>
        </mock:shadow-root>
      </flip-option-list-item>
    `);
  });
});
