import { newSpecPage } from "@stencil/core/testing";

import { FlipActionListSection } from "./flip-action-list-section";

describe("flip-action-list-section", () => {
  it("renders its label and items", async () => {
    const page = await newSpecPage({
      components: [FlipActionListSection],
      html: `
        <flip-action-list-section label="Label">
          <flip-action-list-item label="This is an action"></flip-action-list-item>
          <flip-action-list-item label="This is an action"></flip-action-list-item>
        </flip-action-list-section>
      `,
    });

    expect(page.root).toEqualHtml(`
      <flip-action-list-section label="Label">
        <mock:shadow-root>
          <div class="action-list-section">
            <span class="action-list-section__label">
              Label
            </span>
            <div class="action-list-section__items">
              <slot></slot>
            </div>
          </div>
        </mock:shadow-root>
        <flip-action-list-item label="This is an action"></flip-action-list-item>
        <flip-action-list-item label="This is an action"></flip-action-list-item>
      </flip-action-list-section>
    `);
  });
});
