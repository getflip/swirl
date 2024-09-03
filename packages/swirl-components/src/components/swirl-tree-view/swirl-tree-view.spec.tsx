import { newSpecPage } from "@stencil/core/testing";

import { SwirlTreeView } from "./swirl-tree-view";

describe("swirl-tree-view", () => {
  it("renders a tree with children", async () => {
    const page = await newSpecPage({
      components: [SwirlTreeView],
      html: `
        <swirl-tree-view label="Label">
          <li role="treeitem">1</li>
          <li role="treeitem">2</li>
          <li role="treeitem">3</li>
        </swirl-tree-view>
      `,
    });

    expect(page.root).toMatchInlineSnapshot(`
      <swirl-tree-view label="Label">
        <mock:shadow-root>
          <ul aria-label="Label" role="tree">
            <slot></slot>
          </ul>
        </mock:shadow-root>
        <li role="treeitem">
          1
        </li>
        <li role="treeitem">
          2
        </li>
        <li role="treeitem">
          3
        </li>
      </swirl-tree-view>
    `);
  });
});
