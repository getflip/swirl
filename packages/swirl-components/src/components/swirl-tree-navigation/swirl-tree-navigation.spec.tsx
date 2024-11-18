import { newSpecPage } from "@stencil/core/testing";

import { SwirlTreeNavigation } from "./swirl-tree-navigation";

describe("swirl-tree-navigation", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [SwirlTreeNavigation],
      html: `<swirl-tree-navigation label="navigation"></swirl-tree-navigation>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-tree-navigation label="navigation">
        <mock:shadow-root>
          <ul aria-label="navigation" class="tree-navigation" role="tree">
           <slot></slot>
          </ul>
        </mock:shadow-root>
      </swirl-tree-navigation>
    `);
  });
});
