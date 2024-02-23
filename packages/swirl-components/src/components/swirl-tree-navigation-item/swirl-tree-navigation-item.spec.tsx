import { newSpecPage } from "@stencil/core/testing";

import { SwirlTreeNavigationItem } from "./swirl-tree-navigation-item";

describe("swirl-tree-navigation-item", () => {
  it("renders its label and icon", async () => {
    const page = await newSpecPage({
      components: [SwirlTreeNavigationItem],
      html: `<swirl-tree-navigation-item icon="Icon" label="Label"></swirl-tree-navigation-item>`,
    });

    expect(page.root).toMatchInlineSnapshot(`
      <swirl-tree-navigation-item icon="Icon" label="Label">
        <mock:shadow-root>
          <button class="tree-navigation-item tree-navigation-item--has-icon" type="button">
            <span class="tree-navigation-item__icon">
              Icon
            </span>
            <span class="tree-navigation-item__label">
              Label
            </span>
          </button>
        </mock:shadow-root>
      </swirl-tree-navigation-item>
    `);
  });

  it("renders in active state", async () => {
    const page = await newSpecPage({
      components: [SwirlTreeNavigationItem],
      html: `<swirl-tree-navigation-item active="true" label="Label"></swirl-tree-navigation-item>`,
    });

    expect(
      page.root.shadowRoot.children[0].classList.contains(
        "tree-navigation-item--active"
      )
    ).toBeTruthy();
  });
});
