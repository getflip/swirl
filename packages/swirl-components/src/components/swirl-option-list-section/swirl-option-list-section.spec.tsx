import { newSpecPage } from "@stencil/core/testing";

import { FlipOptionListSection } from "./swirl-option-list-section";

describe("flip-option-list-section", () => {
  it("renders its label and items", async () => {
    const page = await newSpecPage({
      components: [FlipOptionListSection],
      html: `
        <flip-option-list-section label="Label">
          <flip-option-list-item label="This is an option" value="1"></flip-option-list-item>
          <flip-option-list-item label="This is an option" value="2"></flip-option-list-item>
        </flip-option-list-section>
      `,
    });

    expect(page.root).toEqualHtml(`
      <flip-option-list-section label="Label">
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
        <flip-option-list-item label="This is an option" value="1"></flip-option-list-item>
        <flip-option-list-item label="This is an option" value="2"></flip-option-list-item>
      </flip-option-list-section>
    `);
  });
});
