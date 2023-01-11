import { newSpecPage } from "@stencil/core/testing";

import { SwirlDescriptionListItem } from "./swirl-description-list-item";

describe("swirl-description-list-item", () => {
  it("renders term and description", async () => {
    const page = await newSpecPage({
      components: [SwirlDescriptionListItem],
      html: `<swirl-description-list-item term="Term">Description</swirl-description-list-item>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-description-list-item term="Term">
        <mock:shadow-root>
          <div class="description-list-item">
            <dt class="description-list-item__term">Term</dt>
            <dd class="description-list-item__description">
              <slot></slot>
            </dd>
          </div>
        </mock:shadow-root>
        Description
      </swirl-description-list-item>
    `);
  });
});
