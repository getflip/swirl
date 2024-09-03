import { newSpecPage } from "@stencil/core/testing";

import { SwirlTreeViewItem } from "./swirl-tree-view-item";

describe("swirl-tree-view-item", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [SwirlTreeViewItem],
      html: `<swirl-tree-view-item></swirl-tree-view-item>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-tree-view-item>
        <mock:shadow-root>
          Hello World
        </mock:shadow-root>
      </swirl-tree-view-item>
    `);
  });
});
