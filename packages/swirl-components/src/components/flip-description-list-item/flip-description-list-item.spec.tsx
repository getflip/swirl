import { newSpecPage } from "@stencil/core/testing";

import { FlipDescriptionListItem } from "./flip-description-list-item";

describe("flip-description-list-item", () => {
  it("renders term and description", async () => {
    const page = await newSpecPage({
      components: [FlipDescriptionListItem],
      html: `<flip-description-list-item term="Term">Description</flip-description-list-item>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-description-list-item term="Term">
        <mock:shadow-root>
          <div class="description-list-item" part="description-list-item">
            <dt class="description-list-item__term" part="description-list-item__term">Term</dt>
            <dd class="description-list-item__description">
              <slot></slot>
            </dd>
          </div>
        </mock:shadow-root>
        Description
      </flip-description-list-item>
    `);
  });
});
