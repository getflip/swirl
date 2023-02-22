import { newSpecPage } from "@stencil/core/testing";

import { SwirlShellNavigationItem } from "./swirl-shell-navigation-item";

describe("swirl-shell-navigation-item", () => {
  it("renders its label and icon", async () => {
    const page = await newSpecPage({
      components: [SwirlShellNavigationItem],
      html: `<swirl-shell-navigation-item icon="Icon" label="Label"></swirl-shell-navigation-item>`,
    });

    expect(page.root).toEqualHtml(`
     <swirl-shell-navigation-item class="shell-navigation-item shell-navigation-item--has-icon" icon="Icon" label="Label" role="link" tabindex="0">
       <mock:shadow-root>
         <span class="shell-navigation-item__icon">
            Icon
          </span>
          <span class="shell-navigation-item__label">
            Label
          </span>
        </mock:shadow-root>
      </swirl-shell-navigation-item>
    `);
  });

  it("renders in active state", async () => {
    const page = await newSpecPage({
      components: [SwirlShellNavigationItem],
      html: `<swirl-shell-navigation-item active="true" label="Label"></swirl-shell-navigation-item>`,
    });

    expect(
      page.root.classList.contains("shell-navigation-item--active")
    ).toBeTruthy();
  });
});
