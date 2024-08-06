import { newSpecPage } from "@stencil/core/testing";

import { SwirlBox } from "./swirl-box";

describe("swirl-box", () => {
  it("renders its content", async () => {
    const page = await newSpecPage({
      components: [SwirlBox],
      html: `<swirl-box>Content</swirl-box>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-box class="box" style="border-color: var(--s-border-default); overflow: visible; padding: var(--s-space-0); position: relative;">
        <mock:shadow-root>
          <slot></slot>
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
      <swirl-box class="box box--cover" cover="true" padding="12" style="border-color: var(--s-border-default); height: 100%; overflow: visible; padding: var(--s-space-12); position: relative; width: 100%;">
        <mock:shadow-root>
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
      <swirl-box bordered="true" center-block="true" center-inline="true" class="box box--bordered box--cover" cover="true" padding="12" style="align-items: center; border-color: var(--s-border-default); display: flex; height: 100%; justify-content: center; overflow: visible; padding: var(--s-space-12); position: relative; width: 100%;">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Content
      </swirl-box>
    `);
  });
});
