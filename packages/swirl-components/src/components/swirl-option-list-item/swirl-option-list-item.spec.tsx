import { newSpecPage } from "@stencil/core/testing";

import { SwirlOptionListItem } from "./swirl-option-list-item";

describe("swirl-option-list-item", () => {
  it("renders with label and icon", async () => {
    const page = await newSpecPage({
      components: [SwirlOptionListItem],
      html: `<swirl-option-list-item
              icon="<swirl-icon-mention></swirl-icon-mention>"
              label="Option List Item"
              selected="true"
              disabled="false"
              context="single-select"
              value="Value">
            </swirl-option-list-item>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-option-list-item context="single-select" disabled="false" icon="<swirl-icon-mention></swirl-icon-mention>" label="Option List Item" selected="true" value="Value">
        <mock:shadow-root>
          <div aria-selected="true" class="option-list-item option-list-item--context-single-select option-list-item--selected" role="option">
            <span class="option-list-item__icon">
              <swirl-icon-mention size="24"></swirl-icon-mention>
            </span>
            <span class="option-list-item__label">
              Option List Item
            </span>
            <span class="option-list-item__selection-icon">
              <swirl-icon-check-small></swirl-icon-check-small>
            </span>
          </div>
        </mock:shadow-root>
      </swirl-option-list-item>
    `);
  });
});
