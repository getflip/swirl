import { newSpecPage } from "@stencil/core/testing";

import { SwirlActionListItem } from "./swirl-action-list-item";

describe("swirl-action-list-item", () => {
  it("renders its label, description and icons", async () => {
    const page = await newSpecPage({
      components: [SwirlActionListItem],
      html: `<swirl-action-list-item description="Description" icon="<swirl-icon-close></swirl-icon-close>" label="Label" suffix="<swirl-icon-chevron-right></swirl-icon-chevron-right>"></swirl-action-list-item>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-action-list-item description="Description" icon="<swirl-icon-close></swirl-icon-close>" label="Label" suffix="<swirl-icon-chevron-right></swirl-icon-chevron-right>">
        <mock:shadow-root>
          <button class="action-list-item action-list-item--intent-default action-list-item--size-m" part="action-list-item" role="menuitem" tabindex="-1" type="button">
            <slot name="avatar"></slot>
            <span class="action-list-item__icon">
              <swirl-icon-close size="24"></swirl-icon-close>
            </span>
            <span class="action-list-item__label-container">
              <span class="action-list-item__label" style="white-space: nowrap;">
                Label
              </span>
              <span class="action-list-item__description">
                Description
              </span>
            </span>
            <span class="action-list-item__suffix">
              <swirl-icon-chevron-right size="24"></swirl-icon-chevron-right>
              <slot name="suffix"></slot>
            </span>
          </button>
        </mock:shadow-root>
      </swirl-action-list-item>
    `);
  });

  it("hides suffix if disabled", async () => {
    const page = await newSpecPage({
      components: [SwirlActionListItem],
      html: `<swirl-action-list-item disabled="true" label="Label"></swirl-action-list-item>`,
    });

    expect(
      page.root.shadowRoot.querySelector(".action-list-item__suffix")
    ).toBeNull();
  });
});
