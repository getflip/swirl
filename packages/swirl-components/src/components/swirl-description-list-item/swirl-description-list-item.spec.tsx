import { newSpecPage } from "@stencil/core/testing";

import { SwirlDescriptionListItem } from "./swirl-description-list-item";

describe("swirl-description-list-item", () => {
  it("renders term and description", async () => {
    const page = await newSpecPage({
      components: [SwirlDescriptionListItem],
      html: `<swirl-description-list-item term="Term">Description</swirl-description-list-item>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-description-list-item role="listitem" term="Term">
        <mock:shadow-root>
          <div class="description-list-item description-list-item--bordered" part="description-list-item" role="group">
            <div class="description-list-item__inner">
              <div class="description-list-item__text-container">
                <div class="description-list-item__term" part="description-list-item__term" role="term">Term</div>
                <div class="description-list-item__description" role="definition">
                  <slot></slot>
                </div>
              </div>
              <div class="description-list-item__tools">
                <slot name="tools"></slot>
              </div>
            </div>
            <div class="description-list-item__additional-content">
              <slot name="additional-content"></slot>
            </div>
          </div>
        </mock:shadow-root>
        Description
      </swirl-description-list-item>
    `);
  });
});
