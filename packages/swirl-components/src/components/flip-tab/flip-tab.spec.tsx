import { newSpecPage } from "@stencil/core/testing";

import { FlipTab } from "./flip-tab";

describe("flip-tab", () => {
  it("renders content", async () => {
    const page = await newSpecPage({
      components: [FlipTab],
      html: `<flip-tab active="true" label="Label" tab-id="tab-id">Content</flip-tab>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-tab active="true" aria-labelledby="tab-tab-id" id="tab-id" label="Label" role="tabpanel" tab-id="tab-id" tabindex="0">
        <mock:shadow-root>
          <div class="tab tab--active">
            <slot></slot>
          </div>
        </mock:shadow-root>
        Content
      </flip-tab>
    `);
  });

  it("hides content when inactive", async () => {
    const page = await newSpecPage({
      components: [FlipTab],
      html: `<flip-tab active="false" label="Label" tab-id="tab-id">Content</flip-tab>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-tab active="false" aria-labelledby="tab-tab-id" id="tab-id" label="Label" role="tabpanel" tab-id="tab-id" tabindex="-1">
        <mock:shadow-root>
          <div class="tab">
            <slot></slot>
          </div>
        </mock:shadow-root>
        Content
      </flip-tab>
    `);
  });
});
