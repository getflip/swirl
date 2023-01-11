import { newSpecPage } from "@stencil/core/testing";

import { SwirlOptionListSection } from "./swirl-option-list-section";

describe("swirl-option-list-section", () => {
  it("renders its label and items", async () => {
    const page = await newSpecPage({
      components: [SwirlOptionListSection],
      html: `
        <swirl-option-list-section label="Label">
          <swirl-option-list-item label="This is an option" value="1"></swirl-option-list-item>
          <swirl-option-list-item label="This is an option" value="2"></swirl-option-list-item>
        </swirl-option-list-section>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-option-list-section label="Label">
        <mock:shadow-root>
          <div aria-labelledby="label" class="option-list-section" role="group">
            <span class="option-list-section__label" id="label">
              Label
            </span>
            <div class="option-list-section__items">
              <slot></slot>
            </div>
          </div>
        </mock:shadow-root>
        <swirl-option-list-item label="This is an option" value="1"></swirl-option-list-item>
        <swirl-option-list-item label="This is an option" value="2"></swirl-option-list-item>
      </swirl-option-list-section>
    `);
  });
});
