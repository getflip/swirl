import { newSpecPage } from "@stencil/core/testing";

import { SwirlShellLayout } from "./swirl-shell-layout";

describe("swirl-shell-layout", () => {
  it("renders its content", async () => {
    const page = await newSpecPage({
      components: [SwirlShellLayout],
      html: `<swirl-shell-layout main-navigation-label="Test">
        <div slot="logo">Logo</div>
        <div slot="mobile-logo">Mobile logo</div>
        <div slot="header-tools">Tools</div>
        <div slot="nav">nav</div>
        <div>Main</div>
        <div slot="sidebar-header">Sidebar header</div>
        <div slot="sidebar">Sidebar</div>
      </swirl-shell-layout>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-shell-layout main-navigation-label=\"Test\">
        <div hidden=\"\" slot=\"sidebar-header\">
          Sidebar header
        </div>
        <div class=\"shell-layout\">
          <header class=\"shell-layout__header\">
            <a class=\"shell-layout__skip-link\" href=\"#main-content\">
              Skip to main content
            </a>
            <div class=\"shell-layout__header-left\">
              <button class=\"shell-layout__header-tool\" type=\"button\">
                <swirl-icon-dock-left size=\"20\"></swirl-icon-dock-left>
                <swirl-visually-hidden>
                  Toggle navigation
                </swirl-visually-hidden>
              </button>
              <button class=\"shell-layout__header-tool\" type=\"button\">
                <swirl-icon-arrow-back size=\"20\"></swirl-icon-arrow-back>
                <swirl-visually-hidden>
                  Navigate back
                </swirl-visually-hidden>
              </button>
              <button class=\"shell-layout__header-tool\" type=\"button\">
                <swirl-icon-arrow-forward size=\"20\"></swirl-icon-arrow-forward>
                <swirl-visually-hidden>
                  Navigate forward
                </swirl-visually-hidden>
              </button>
            </div>
            <div class=\"shell-layout__logo\">
              <div slot=\"logo\">
                Logo
              </div>
            </div>
            <div class=\"shell-layout__header-right\">
              <button class=\"shell-layout__header-tool shell-layout__sidebar-toggle\" type=\"button\">
                <swirl-icon-notifications size=\"20\"></swirl-icon-notifications>
                <swirl-visually-hidden>
                  Toggle sidebar
                </swirl-visually-hidden>
              </button>
              <div slot=\"header-tools\">
                Tools
              </div>
            </div>
          </header>
          <div class=\"shell-layout__mobile-nav-backdrop\"></div>
          <nav aria-labelledby=\"main-navigation-label\" class=\"shell-layout__nav\">
            <div class=\"shell-layout__mobile-logo\">
              <div slot=\"mobile-logo\">
                Mobile logo
              </div>
            </div>
            <swirl-visually-hidden>
              <span id=\"main-navigation-label\">
                Main
              </span>
            </swirl-visually-hidden>
            <div slot=\"nav\">
              nav
            </div>
          </nav>
          <main class=\"shell-layout__main\" id=\"main-content\">
            <div>
              Main
            </div>
          </main>
          <aside class=\"shell-layout__sidebar\">
            <div class=\"shell-layout__sidebar-body\">
              <div class=\"shell-layout__sidebar-app-bar\"></div>
              <div class=\"shell-layout__sidebar-content\">
                <div slot=\"sidebar\">
                  Sidebar
                </div>
              </div>
            </div>
          </aside>
        </div>
      </swirl-shell-layout>
    `);
  });
});
