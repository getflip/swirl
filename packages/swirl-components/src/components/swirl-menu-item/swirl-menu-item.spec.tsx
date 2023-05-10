import { newSpecPage } from "@stencil/core/testing";

import { SwirlMenuItem } from "./swirl-menu-item";

describe("swirl-menu-item", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [SwirlMenuItem],
      html: `<swirl-menu-item></swirl-menu-item>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-menu-item>
        <mock:shadow-root>
          Hello World
        </mock:shadow-root>
      </swirl-menu-item>
    `);
  });
});
