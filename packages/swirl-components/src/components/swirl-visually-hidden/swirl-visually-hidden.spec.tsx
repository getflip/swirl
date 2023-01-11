import { newSpecPage } from "@stencil/core/testing";

import { FlipVisuallyHidden } from "./swirl-visually-hidden";

describe("flip-visually-hidden", () => {
  it("renders its contents", async () => {
    const page = await newSpecPage({
      components: [FlipVisuallyHidden],
      html: `<flip-visually-hidden>Content</flip-visually-hidden>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-visually-hidden>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
        Content
      </flip-visually-hidden>
    `);
  });
});
