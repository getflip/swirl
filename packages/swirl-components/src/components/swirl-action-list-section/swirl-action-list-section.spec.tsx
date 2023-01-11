import { newSpecPage } from "@stencil/core/testing";

import { SwirlActionListSection } from "./swirl-action-list-section";

describe("swirl-action-list-section", () => {
  it("renders its label and items", async () => {
    const page = await newSpecPage({
      components: [SwirlActionListSection],
      html: `
        <swirl-action-list-section label="Label">
          <swirl-action-list-item label="This is an action"></swirl-action-list-item>
          <swirl-action-list-item label="This is an action"></swirl-action-list-item>
        </swirl-action-list-section>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-action-list-section label="Label">
        <mock:shadow-root>
          <div aria-labelledby="label" class="action-list-section" role="group">
            <span class="action-list-section__label" id="label">
              Label
            </span>
            <div class="action-list-section__items">
              <slot></slot>
            </div>
          </div>
        </mock:shadow-root>
        <swirl-action-list-item label="This is an action"></swirl-action-list-item>
        <swirl-action-list-item label="This is an action"></swirl-action-list-item>
      </swirl-action-list-section>
    `);
  });
});
