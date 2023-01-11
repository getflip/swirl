import { newSpecPage } from "@stencil/core/testing";

import { FlipBox } from "./swirl-box";

describe("flip-box", () => {
  it("renders its content", async () => {
    const page = await newSpecPage({
      components: [FlipBox],
      html: `<flip-box>Content</flip-box>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-box>
        <mock:shadow-root>
          <div class="box" style="overflow: visible; padding: var(--s-space-0); position: relative;">
            <slot></slot>
          </div>
        </mock:shadow-root>
        Content
      </flip-box>
    `);
  });

  it("sets correct styles", async () => {
    const page = await newSpecPage({
      components: [FlipBox],
      html: `<flip-box cover="true" padding="12">Content</flip-box>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-box cover="true" padding="12" style="width: 100%; height: 100%;">
        <mock:shadow-root>
          <div class="box box--cover" style="overflow: visible; padding: var(--s-space-12); position: relative;">
            <slot></slot>
          </div>
        </mock:shadow-root>
        Content
      </flip-box>
    `);
  });

  it("sets correct classes", async () => {
    const page = await newSpecPage({
      components: [FlipBox],
      html: `<flip-box bordered="true" center-block="true" center-inline="true" cover="true" padding="12">Content</flip-box>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-box bordered="true" center-block="true" center-inline="true" cover="true" padding="12" style="width: 100%; height: 100%;">
        <mock:shadow-root>
          <div class="box box--bordered box--center-block box--center-inline box--cover" style="overflow: visible; padding: var(--s-space-12); position: relative;">
            <slot></slot>
          </div>
        </mock:shadow-root>
        Content
      </flip-box>
    `);
  });
});
