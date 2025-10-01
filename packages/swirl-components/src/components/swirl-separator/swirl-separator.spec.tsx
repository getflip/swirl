import { newSpecPage } from "@stencil/core/testing";

import { SwirlSeparator } from "./swirl-separator";

describe("swirl-separator", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [SwirlSeparator],
      html: `<swirl-separator></swirl-separator>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-separator aria-orientation="horizontal" class="separator separator--color-default separator--orientation-horizontal" role="separator" style="padding-top: var(--s-space-8); padding-bottom: var(--s-space-8);">
        <mock:shadow-root>
          <span class="separator__line"></span>
        </mock:shadow-root>
      </swirl-separator>
    `);
  });

  it("renders with strong color", async () => {
    const page = await newSpecPage({
      components: [SwirlSeparator],
      html: `<swirl-separator color="strong"></swirl-separator>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-separator aria-orientation="horizontal" color="strong" class="separator separator--color-strong separator--orientation-horizontal" role="separator" style="padding-top: var(--s-space-8); padding-bottom: var(--s-space-8);">
        <mock:shadow-root>
          <span class="separator__line"></span>
        </mock:shadow-root>
      </swirl-separator>
    `);
  });

  it("renders with highlight color", async () => {
    const page = await newSpecPage({
      components: [SwirlSeparator],
      html: `<swirl-separator color="highlight"></swirl-separator>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-separator aria-orientation="horizontal" color="highlight" class="separator separator--color-highlight separator--orientation-horizontal" role="separator" style="padding-top: var(--s-space-8); padding-bottom: var(--s-space-8);">
        <mock:shadow-root>
          <span class="separator__line"></span>
        </mock:shadow-root>
      </swirl-separator>
    `);
  });

  it("renders the label", async () => {
    const page = await newSpecPage({
      components: [SwirlSeparator],
      html: `<swirl-separator label="Label"></swirl-separator>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-separator aria-orientation="horizontal" label="Label" class="separator separator--color-default separator--orientation-horizontal" role="separator" style="padding-top: var(--s-space-8); padding-bottom: var(--s-space-8);">
        <mock:shadow-root>
          <span class="separator__line"></span>
          <span class="separator__label">Label</span>
          <span class="separator__line"></span>
        </mock:shadow-root>
      </swirl-separator>
    `);
  });

  it("renders without role", async () => {
    const page = await newSpecPage({
      components: [SwirlSeparator],
      html: `<swirl-separator semantics="none"></swirl-separator>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-separator class="separator separator--color-default separator--orientation-horizontal" role="none" semantics="none" style="padding-top: var(--s-space-8); padding-bottom: var(--s-space-8);">
        <mock:shadow-root>
          <span class="separator__line"></span>
        </mock:shadow-root>
      </swirl-separator>
    `);
  });
});
