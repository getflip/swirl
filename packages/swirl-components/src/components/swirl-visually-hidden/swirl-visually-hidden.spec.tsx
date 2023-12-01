import { newSpecPage } from "@stencil/core/testing";

import { SwirlVisuallyHidden } from "./swirl-visually-hidden";

describe("swirl-visually-hidden", () => {
  it("renders its contents", async () => {
    const page = await newSpecPage({
      components: [SwirlVisuallyHidden],
      html: `<swirl-visually-hidden>Content</swirl-visually-hidden>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-visually-hidden>
        Content
      </swirl-visually-hidden>
    `);
  });
});
