import { newSpecPage } from "@stencil/core/testing";

import { FlipTreeNavigationItem } from "./flip-tree-navigation-item";

describe("flip-tree-navigation-item", () => {
  it("renders its label and icon", async () => {
    const page = await newSpecPage({
      components: [FlipTreeNavigationItem],
      html: `<flip-tree-navigation-item icon="Icon" label="Label"></flip-tree-navigation-item>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-tree-navigation-item icon="Icon" label="Label">
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
      </flip-tree-navigation-item>
    `);
  });

  it("renders in active state", async () => {
    const page = await newSpecPage({
      components: [FlipTreeNavigationItem],
      html: `<flip-tree-navigation-item active="true" label="Label"></flip-tree-navigation-item>`,
    });

    expect(
      page.root.shadowRoot
        .querySelector("button")
        .classList.contains("tree-navigation-item--active")
    ).toBeTruthy();
  });
});
