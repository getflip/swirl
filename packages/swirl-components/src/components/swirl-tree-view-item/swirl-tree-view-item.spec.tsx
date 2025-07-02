import { newSpecPage } from "@stencil/core/testing";

import { SwirlTreeViewItem } from "./swirl-tree-view-item";

describe("swirl-tree-view-item", () => {
  it("renders label and ID", async () => {
    const page = await newSpecPage({
      components: [SwirlTreeViewItem],
      html: `
        <div role="tree">
          <swirl-tree-view-item item-id="item" label="Label"></swirl-tree-view-item>
        </div>
      `,
    });

    expect(page.root).toMatchInlineSnapshot(`
      <swirl-tree-view-item id="item" item-id="item" label="Label" role="none">
        <!---->
        <li class="tree-view-item" role="none">
          <a aria-level="1" aria-selected="false" class="tree-view-item__link" role="treeitem" tabindex="-1">
            <span class="tree-view-item__toggle-icon"></span>
            <span class="tree-view-item__label">
              Label
            </span>
            <span class="tree-view-item__tags"></span>
          </a>
          <ul aria-label="Label" class="tree-view-item__children" id="item-children" role="group" style="display: none;"></ul>
        </li>
      </swirl-tree-view-item>
    `);
  });

  it("can be expaned/collapsed with children", async () => {
    const page = await newSpecPage({
      components: [SwirlTreeViewItem],
      html: `
        <div role="tree">
          <swirl-tree-view-item itemId="1" label="Label">
            <swirl-tree-view-item itemId="2" label="Label"></swirl-tree-view-item>
            <swirl-tree-view-item itemId="3" label="Label"></swirl-tree-view-item>
          </swirl-tree-view-item>
        </div>
      `,
    });

    const spy = jest.fn();

    page.root.addEventListener("expandedChange", spy);

    expect(page.root.querySelector('[aria-expanded="true"]')).toBeFalsy();

    await page.root.expand();
    await page.waitForChanges();

    expect(page.root.querySelector('[aria-expanded="true"]')).toBeTruthy();

    await page.root.collapse();
    await page.waitForChanges();

    expect(page.root.querySelector('[aria-expanded="true"]')).toBeFalsy();

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.mock.calls[0][0].detail).toBe(true);
    expect(spy.mock.calls[1][0].detail).toBe(false);
  });

  it("can be selected/unselected", async () => {
    const page = await newSpecPage({
      components: [SwirlTreeViewItem],
      html: `
        <div role="tree">
          <swirl-tree-view-item itemId="1" label="Label"></swirl-tree-view-item>
        </div>
      `,
    });

    expect(page.root.querySelector('[aria-selected="false"]')).toBeTruthy();

    await page.root.select();
    await page.waitForChanges();

    expect(page.root.querySelector('[aria-selected="true"]')).toBeTruthy();

    await page.root.unselect();
    await page.waitForChanges();

    expect(page.root.querySelector('[aria-selected="false"]')).toBeTruthy();

    await page.root.select(true);
    await page.waitForChanges();

    expect(page.root.querySelector('[aria-selected="true"]')).toBeTruthy();
  });
});
