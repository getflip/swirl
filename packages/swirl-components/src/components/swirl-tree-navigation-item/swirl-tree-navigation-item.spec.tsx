import { newSpecPage } from "@stencil/core/testing";

import { SwirlTreeNavigationItem } from "./swirl-tree-navigation-item";

describe("swirl-tree-navigation-item", () => {
  it("renders its label and icon", async () => {
    const page = await newSpecPage({
      components: [SwirlTreeNavigationItem],
      html: `<swirl-tree-navigation-item icon="Icon" label="Label"></swirl-tree-navigation-item>`,
    });

    expect(page.root).toEqualHtml(`
     <swirl-tree-navigation-item class="tree-navigation-item tree-navigation-item--has-icon" icon="Icon" label="Label" role="link" tabindex="0">
       <mock:shadow-root>
         <span class="tree-navigation-item__icon">
            Icon
          </span>
          <span class="tree-navigation-item__label">
            Label
          </span>
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
      page.root.classList.contains("tree-navigation-item--active")
    ).toBeTruthy();
  });
});
