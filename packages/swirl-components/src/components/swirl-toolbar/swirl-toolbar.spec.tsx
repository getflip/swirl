import { newSpecPage } from "@stencil/core/testing";

import { SwirlToolbar } from "./swirl-toolbar";

describe("swirl-toolbar", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [SwirlToolbar],
      html: `<swirl-toolbar></swirl-toolbar>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-toolbar>
        <mock:shadow-root>
          Hello World
        </mock:shadow-root>
      </swirl-toolbar>
    `);
  });
});
