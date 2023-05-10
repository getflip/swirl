import { newSpecPage } from "@stencil/core/testing";

import { SwirlMenu } from "./swirl-menu";

describe("swirl-menu", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [SwirlMenu],
      html: `<swirl-menu></swirl-menu>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-menu>
        <mock:shadow-root>
          Hello World
        </mock:shadow-root>
      </swirl-menu>
    `);
  });
});
