import { newSpecPage } from "@stencil/core/testing";

import { SwirlSeparator } from "./swirl-separator";

describe("swirl-separator", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [SwirlSeparator],
      html: `<swirl-separator></swirl-separator>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-separator aria-orientation="horizontal" class="separator separator--border-color-default separator--orientation-horizontal" role="separator" style="padding-top: var(--s-space-8); padding-bottom: var(--s-space-8);">
        <mock:shadow-root>
          <span class="separator__line"></span>
        </mock:shadow-root>
      </swirl-separator>
    `);
  });

  it("renders with strong border color", async () => {
    const page = await newSpecPage({
      components: [SwirlSeparator],
      html: `<swirl-separator border-color="strong"></swirl-separator>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-separator aria-orientation="horizontal" border-color="strong" class="separator separator--border-color-strong separator--orientation-horizontal" role="separator" style="padding-top: var(--s-space-8); padding-bottom: var(--s-space-8);">
        <mock:shadow-root>
          <span class="separator__line"></span>
        </mock:shadow-root>
      </swirl-separator>
    `);
  });
});
