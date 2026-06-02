import { newSpecPage } from "@stencil/core/testing";
import { SwirlTreeNavigationItem } from "./swirl-tree-navigation-item";

describe("swirl-tree-navigation-item", () => {
  it("renders its label and icon", async () => {
    const page = await newSpecPage({
      components: [SwirlTreeNavigationItem],
      html: `<swirl-tree-navigation-item icon="Icon" label="Label"></swirl-tree-navigation-item>`,
    });

    expect(page.root).toMatchInlineSnapshot(`
      <swirl-tree-navigation-item icon="Icon" label="Label" role="none">
        <template shadowrootmode="open">
          <li aria-level="1" class="tree-navigation-item" role="treeitem">
            <button class="tree-navigation-item__link tree-navigation-item__link--has-icon" id="undefined-button" type="button">
              <span class="tree-navigation-item__content">
                <swirl-icon aria-hidden="true" aria-label="Label icon" class="tree-navigation-item__icon" glyph="Icon" role="img" size="20"></swirl-icon>
                <span class="tree-navigation-item__label">
                  <span class="tree-navigation-item__label-text">
                    Label
                  </span>
                </span>
              </span>
            </button>
          </li>
        </template>
      </swirl-tree-navigation-item>
    `);
  });

  it("renders custom-icon slot taking precedence over icon prop", async () => {
    const page = await newSpecPage({
      components: [SwirlTreeNavigationItem],
      html: `
        <swirl-tree-navigation-item icon="Icon" label="Label" navigation-item-id="item-1">
          <swirl-icon-email slot="custom-icon" size="20"></swirl-icon-email>
        </swirl-tree-navigation-item>
      `,
    });

    const shadowRoot = page.root.shadowRoot;
    const customIconSlot = shadowRoot.querySelector(
      "slot[name='custom-icon']"
    );
    const propIcon = shadowRoot.querySelector("swirl-icon[glyph='Icon']");
    const link = shadowRoot.querySelector(".tree-navigation-item__link");

    expect(customIconSlot).not.toBeNull();
    expect(propIcon).toBeNull();
    expect(
      link.classList.contains("tree-navigation-item__link--has-icon")
    ).toBeTruthy();
  });

  it("renders in active state", async () => {
    const page = await newSpecPage({
      components: [SwirlTreeNavigationItem],
      html: `<swirl-tree-navigation-item active="true" label="Label"></swirl-tree-navigation-item>`,
    });

    // Update to check for the new active class on the link element
    expect(
      page.root.shadowRoot
        .querySelector(".tree-navigation-item__link")
        .classList.contains("tree-navigation-item__link--active")
    ).toBeTruthy();
  });
});
