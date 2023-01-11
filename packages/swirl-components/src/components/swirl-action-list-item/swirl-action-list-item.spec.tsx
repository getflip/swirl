import { newSpecPage } from "@stencil/core/testing";

import { FlipActionListItem } from "./swirl-action-list-item";

describe("flip-action-list-item", () => {
  it("renders its label, description and icons", async () => {
    const page = await newSpecPage({
      components: [FlipActionListItem],
      html: `<flip-action-list-item description="Description" icon="<flip-icon-close></flip-icon-close>" label="Label" suffix="<flip-icon-chevron-right></flip-icon-chevron-right>"></flip-action-list-item>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-action-list-item description="Description" icon="<flip-icon-close></flip-icon-close>" label="Label" suffix="<flip-icon-chevron-right></flip-icon-chevron-right>">
        <mock:shadow-root>
          <button class="action-list-item action-list-item--intent-default action-list-item--size-m" role="menuitem" tabindex="-1" type="button">
            <span class="action-list-item__icon">
              <flip-icon-close></flip-icon-close>
            </span>
            <span class="action-list-item__label-container">
              <span class="action-list-item__label">
                Label
              </span>
              <span class="action-list-item__description">
                Description
              </span>
            </span>
            <span class="action-list-item__suffix">
              <flip-icon-chevron-right></flip-icon-chevron-right>
            </span>
          </button>
        </mock:shadow-root>
      </flip-action-list-item>
    `);
  });

  it("hides suffix if disabled", async () => {
    const page = await newSpecPage({
      components: [FlipActionListItem],
      html: `<flip-action-list-item disabled="true" label="Label"></flip-action-list-item>`,
    });

    expect(
      page.root.shadowRoot.querySelector(".action-list-item__suffix")
    ).toBeNull();
  });
});
