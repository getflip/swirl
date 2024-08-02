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

    expect(page.root).toMatchInlineSnapshot(`
      <swirl-shell-navigation-item label="Label">
        <mock:shadow-root>
          <swirl-tooltip content="Label" delay="200" position="right" positioning="fixed">
            <button class="shell-navigation-item" type="button">
              <span class="shell-navigation-item__icon">
                <slot name="icon"></slot>
              </span>
              <span class="shell-navigation-item__label">
                Label
              </span>
            </button>
          </swirl-tooltip>
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

    expect(
      page.root.shadowRoot
        .querySelector(".shell-navigation-item")
        .classList.contains("shell-navigation-item--active")
    ).toBeTruthy();
  });

  it("renders as link when href is set", async () => {
    const page = await newSpecPage({
      components: [SwirlShellNavigationItem],
      html: `<swirl-shell-navigation-item href="https://google.com" target="_blank" label="Label"></swirl-shell-navigation-item>`,
    });

    const link = page.root;

    expect(link.href).toBe("https://google.com");
    expect(link.target).toBe("_blank");
  });
});
