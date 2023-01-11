import { newSpecPage } from "@stencil/core/testing";

import { SwirlSeparator } from "./swirl-separator";

describe("swirl-separator", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [SwirlSeparator],
      html: `<swirl-separator></swirl-separator>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-separator class="separator" role="separator">
        <mock:shadow-root>
          <span class="separator__line"></span>
        </mock:shadow-root>
      </swirl-separator>
    `);
  });
});
