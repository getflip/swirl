import { newSpecPage } from "@stencil/core/testing";

import { SwirlShellLayout } from "./swirl-shell-layout";

describe("swirl-shell-layout", () => {
  it("renders its content", async () => {
    const page = await newSpecPage({
      components: [SwirlShellLayout],
      html: `<swirl-shell-layout>
        <div slot="logo-expanded">Expanded logo</div>
        <div slot="logo-collapsed">Collapsed logo</div>
        <div slot="tools">Tools</div>
        <div slot="main-navigation">Main navigation</div>
        <div slot="main">Main</div>
      </swirl-shell-layout>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-shell-layout>
        <mock:shadow-root>
          <div class="shell-layout">
            <div class="shell-layout__sidebar">
              <header class="shell-layout__header">
                <div class="shell-layout__logo-bar">
                  <div class="shell-layout__expanded-logo">
                    <slot name="logo-expanded"></slot>
                  </div>
                  <div class="shell-layout__collapsed-logo">
                    <slot name="logo-collapsed"></slot>
                  </div>
                  <div class="shell-layout__toggle">
                    <swirl-button hidelabel="" icon="<swirl-icon-double-arrow-left></swirl-icon-double-arrow-left>" label="Toggle sidebar" swirlariaexpanded="true"></swirl-button>
                  </div>
                </div>
                <div class="shell-layout__tools">
                  <slot name="tools"></slot>
                </div>
              </header>
              <nav aria-label="Main" class="shell-layout__main-navigation">
                <slot name="main-navigation"></slot>
              </nav>
            </div>
            <main class="shell-layout__main">
              <slot name="main"></slot>
            </main>
          </div>
        </mock:shadow-root>
        <div slot="logo-expanded">
          Expanded logo
        </div>
        <div slot="logo-collapsed">
          Collapsed logo
        </div>
        <div slot="tools">
          Tools
        </div>
        <div slot="main-navigation">
          Main navigation
        </div>
        <div slot="main">
          Main
        </div>
      </swirl-shell-layout>
    `);
  });
});
