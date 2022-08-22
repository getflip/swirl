import { newSpecPage } from "@stencil/core/testing";

import { FlipBanner } from "./flip-banner";

describe("flip-banner", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [FlipBanner],
      html: `<flip-banner></flip-banner>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-banner>
        <mock:shadow-root>
          Hello World
        </mock:shadow-root>
      </flip-banner>
    `);
  });
});
