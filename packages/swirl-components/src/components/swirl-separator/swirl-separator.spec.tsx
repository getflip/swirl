import { newSpecPage } from "@stencil/core/testing";

import { FlipSeparator } from "./swirl-separator";

describe("flip-separator", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [FlipSeparator],
      html: `<flip-separator></flip-separator>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-separator class="separator" role="separator">
        <mock:shadow-root>
          <span class="separator__line"></span>
        </mock:shadow-root>
      </flip-separator>
    `);
  });
});
