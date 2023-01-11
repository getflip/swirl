import { newSpecPage } from "@stencil/core/testing";

import { SwirlTab } from "./swirl-tab";

describe("swirl-tab", () => {
  it("renders content", async () => {
    const page = await newSpecPage({
      components: [SwirlTab],
      html: `<swirl-tab active="true" label="Label" tab-id="tab-id">Content</swirl-tab>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-tab active="true" aria-labelledby="tab-tab-id" id="tab-id" label="Label" role="tabpanel" tab-id="tab-id" tabindex="0">
        <mock:shadow-root>
          <div class="tab tab--active">
            <slot></slot>
          </div>
        </mock:shadow-root>
        Content
      </swirl-tab>
    `);
  });

  it("hides content when inactive", async () => {
    const page = await newSpecPage({
      components: [SwirlTab],
      html: `<swirl-tab active="false" label="Label" tab-id="tab-id">Content</swirl-tab>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-tab active="false" aria-labelledby="tab-tab-id" id="tab-id" label="Label" role="tabpanel" tab-id="tab-id" tabindex="-1">
        <mock:shadow-root>
          <div class="tab">
            <slot></slot>
          </div>
        </mock:shadow-root>
        Content
      </swirl-tab>
    `);
  });
});
