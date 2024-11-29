import { newSpecPage } from "@stencil/core/testing";

import { SwirlResourceListSection } from "./swirl-resource-list-section";

describe("swirl-resource-list-section", () => {
  it("renders its label and items", async () => {
    const page = await newSpecPage({
      components: [SwirlResourceListSection],
      html: `
        <swirl-resource-list-section label="Resource section!">
          <swirl-resource-list-item label="Item #1"></swirl-resource-list-item>
          <swirl-resource-list-item label="Item #2"></swirl-resource-list-item>
        </swirl-resource-list-section>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-resource-list-section label="Resource section!">
        <mock:shadow-root>
          <div aria-labelledby="label" class="resource-list-section" role="rowgroup">
            <span class="resource-list-section__label" id="label" part="resource-list-section__label">
              Resource section!
            </span>
            <swirl-stack spacing="0">
              <slot></slot>
            </swirl-stack>
          </div>
        </mock:shadow-root>
        <swirl-resource-list-item label="Item #1"></swirl-resource-list-item>
        <swirl-resource-list-item label="Item #2"></swirl-resource-list-item>
      </swirl-resource-list-section>
    `);
  });
});
