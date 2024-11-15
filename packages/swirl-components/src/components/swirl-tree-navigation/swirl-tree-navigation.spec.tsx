import { newSpecPage } from "@stencil/core/testing";

import { SwirlTreeNavigation } from "./swirl-tree-navigation";

describe("swirl-tree-navigation", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [SwirlTreeNavigation],
      html: `<swirl-tree-navigation></swirl-tree-navigation>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-tree-navigation>
        <mock:shadow-root>
          Hello World
        </mock:shadow-root>
      </swirl-tree-navigation>
    `);
  });
});
