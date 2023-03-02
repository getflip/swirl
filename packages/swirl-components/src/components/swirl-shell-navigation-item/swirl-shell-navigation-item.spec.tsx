import { newSpecPage } from "@stencil/core/testing";

import { SwirlShellNavigationItem } from "./swirl-shell-navigation-item";

describe("swirl-shell-navigation-item", () => {
  it("renders its label and icon", async () => {
    const page = await newSpecPage({
      components: [SwirlShellNavigationItem],
      html: `
      <swirl-shell-navigation-item label="Label">
        <swirl-app-icon slot="icon" label="link" src="https://picsum.photos/id/433/144/144"></swirl-app-icon>
      </swirl-shell-navigation-item>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-shell-navigation-item class="shell-navigation-item" label="Label" role="link" tabindex="0">
        <mock:shadow-root>
          <span class="shell-navigation-item__indicator"></span>
          <slot name="icon"></slot>
          <span class="shell-navigation-item__label">
            Label
          </span>
        </mock:shadow-root>
        <swirl-app-icon label="link" slot="icon" src="https://picsum.photos/id/433/144/144"></swirl-app-icon>
      </swirl-shell-navigation-item>
    `);
  });

  it("renders in active state", async () => {
    const page = await newSpecPage({
      components: [SwirlShellNavigationItem],
      html: `
      <swirl-shell-navigation-item active="true" label="Label">
        <swirl-app-icon slot="icon" label="link" src="https://picsum.photos/id/433/144/144"></swirl-app-icon>
      </swirl-shell-navigation-item>`,
    });

    expect(page.root).toEqualHtml(`
    <swirl-shell-navigation-item active="true" class="shell-navigation-item shell-navigation-item--active" label="Label" role="link" tabindex="0">
      <mock:shadow-root>
        <span class="shell-navigation-item__indicator shell-navigation-item__indicator--active"></span>
        <slot name="icon"></slot>
        <span class="shell-navigation-item__label">
          Label
        </span>
      </mock:shadow-root>
      <swirl-app-icon label="link" slot="icon" src="https://picsum.photos/id/433/144/144"></swirl-app-icon>
    </swirl-shell-navigation-item>
  `);

    expect(
      page.root.classList.contains("shell-navigation-item--active")
    ).toBeTruthy();
  });
});
