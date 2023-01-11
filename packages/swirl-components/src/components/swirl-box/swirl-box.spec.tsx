import { newSpecPage } from "@stencil/core/testing";

import { SwirlBox } from "./swirl-box";

describe("swirl-box", () => {
  it("renders its content", async () => {
    const page = await newSpecPage({
      components: [SwirlBox],
      html: `<swirl-box>Content</swirl-box>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-box>
        <mock:shadow-root>
          <div class="box" style="overflow: visible; padding: var(--s-space-0); position: relative;">
            <slot></slot>
          </div>
        </mock:shadow-root>
        Content
      </swirl-box>
    `);
  });

  it("sets correct styles", async () => {
    const page = await newSpecPage({
      components: [SwirlBox],
      html: `<swirl-box cover="true" padding="12">Content</swirl-box>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-box cover="true" padding="12" style="width: 100%; height: 100%;">
        <mock:shadow-root>
          <div class="box box--cover" style="overflow: visible; padding: var(--s-space-12); position: relative;">
            <slot></slot>
          </div>
        </mock:shadow-root>
        Content
      </swirl-box>
    `);
  });

  it("sets correct classes", async () => {
    const page = await newSpecPage({
      components: [SwirlBox],
      html: `<swirl-box bordered="true" center-block="true" center-inline="true" cover="true" padding="12">Content</swirl-box>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-box bordered="true" center-block="true" center-inline="true" cover="true" padding="12" style="width: 100%; height: 100%;">
        <mock:shadow-root>
          <div class="box box--bordered box--center-block box--center-inline box--cover" style="overflow: visible; padding: var(--s-space-12); position: relative;">
            <slot></slot>
          </div>
        </mock:shadow-root>
        Content
      </swirl-box>
    `);
  });
});
