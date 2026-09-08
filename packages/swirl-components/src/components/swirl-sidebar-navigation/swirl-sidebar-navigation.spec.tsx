import { newSpecPage } from "@stencil/core/testing";

import { SwirlSidebarNavigation } from "./swirl-sidebar-navigation";

describe("swirl-sidebar-navigation", () => {
  it("renders its slots, app name, and logo fallback", async () => {
    const page = await newSpecPage({
      components: [SwirlSidebarNavigation],
      html: `
        <swirl-sidebar-navigation app-name="Fusion">
          <div>Navigation</div>
          <div slot="user">User</div>
        </swirl-sidebar-navigation>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-sidebar-navigation app-name="Fusion">
        <mock:shadow-root>
          <div class="sidebar-navigation">
            <header class="sidebar-navigation__header">
              <div class="sidebar-navigation__logo-section">
                <slot name="logo">
                  <svg aria-hidden="true" class="sidebar-navigation__logo" fill="none" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
                    <rect fill="#2151F5" height="32" rx="8" width="32"></rect>
                    <path clip-rule="evenodd" d="M2.52486 276.36C5.57709 289.149 11.02 301.094 18.2296 311.628L258.719 138.748C269.874 131.507 278.35 121.993 285.395 110.766C291.904 100.212 296.922 87.3014 298.875 74.6738C300.769 61.4277 300.809 48.353 297.757 35.5639C294.705 22.7748 289.262 10.8302 282.052 0.296051L41.5626 173.176C30.4077 180.417 21.9314 189.931 14.8867 201.158C8.37746 211.712 3.35926 224.623 1.40724 237.25C-0.544773 249.878 0.0338964 262.896 2.52486 276.36ZM80.3121 424.184C83.3644 436.973 88.8073 448.918 96.0169 459.452L229.113 363.743C240.268 356.502 248.744 346.988 255.789 335.761C262.298 325.207 267.317 312.296 269.269 299.668C271.164 286.422 271.203 273.348 268.151 260.559C265.099 247.769 259.656 235.825 252.446 225.291L119.35 320.999C108.195 328.24 99.7187 337.755 92.674 348.982C86.1647 359.535 81.1465 372.446 79.1945 385.074C77.2996 398.32 77.2599 411.395 80.3121 424.184Z" fill="#FFFFFF" fill-rule="evenodd" transform="translate(9.7 6.4) scale(0.0418)"></path>
                  </svg>
                </slot>
                <span class="sidebar-navigation__app-name">
                  Fusion
                </span>
              </div>
              <button aria-expanded="true" aria-label="Hide navigation" class="sidebar-navigation__collapse-button" type="button">
                <swirl-icon-double-arrow-left size="24"></swirl-icon-double-arrow-left>
              </button>
            </header>
            <nav aria-label="Main" class="sidebar-navigation__content">
              <slot></slot>
            </nav>
            <div class="sidebar-navigation__footer">
              <slot name="user"></slot>
            </div>
          </div>
        </mock:shadow-root>
        <div>
          Navigation
        </div>
        <div slot="user">
          User
        </div>
      </swirl-sidebar-navigation>
    `);
  });

  it("emits collapseButtonClick when the collapse button is clicked", async () => {
    const page = await newSpecPage({
      components: [SwirlSidebarNavigation],
      html: `<swirl-sidebar-navigation></swirl-sidebar-navigation>`,
    });

    const spy = jest.fn();

    page.root.addEventListener("collapseButtonClick", spy);

    page.root.shadowRoot
      .querySelector<HTMLButtonElement>(".sidebar-navigation__collapse-button")
      .click();

    expect(spy).toHaveBeenCalled();
  });

  it("hides the collapse button", async () => {
    const page = await newSpecPage({
      components: [SwirlSidebarNavigation],
      html: `<swirl-sidebar-navigation hide-collapse-button></swirl-sidebar-navigation>`,
    });

    expect(
      page.root.shadowRoot.querySelector(".sidebar-navigation__collapse-button")
    ).toBeNull();
  });

  it("applies the elevated modifier", async () => {
    const page = await newSpecPage({
      components: [SwirlSidebarNavigation],
      html: `<swirl-sidebar-navigation elevated></swirl-sidebar-navigation>`,
    });

    expect(
      page.root.shadowRoot.querySelector(".sidebar-navigation")
    ).toHaveClass("sidebar-navigation--elevated");
  });
});
