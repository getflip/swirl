import { newSpecPage } from "@stencil/core/testing";

import { FlipAppLayout } from "./flip-app-layout";

(global as any).MutationObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
};

describe("flip-app-layout", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [FlipAppLayout],
      html: `<flip-app-layout></flip-app-layout>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-app-layout>
        <mock:shadow-root>
          <section aria-labelledby="app-name" class="app-layout app-layout--mobile-view-body app-layout--transitioning-from-undefined app-layout--transitioning-to-undefined" role="document" tabindex="0">
            <div class="app-layout__grid">
              <header class="app-layout__header">
                <flip-heading as="h1" headingid="app-name" level="2"></flip-heading>
                <span class="app-layout__navigation-controls">
                  <slot name="navigation-controls"></slot>
                </span>
              </header>
              <nav class="app-layout__navigation">
                <slot name="navigation"></slot>
              </nav>
              <section aria-labelledby="app-name" class="app-layout__body">
                <header class="app-layout__app-bar">
                  <flip-heading as="h1" headingid="app-name" level="2"></flip-heading>
                </header>
                <div class="app-layout__content">
                  <slot name="content"></slot>
                </div>
              </section>
              <aside class="app-layout__sidebar">
                <header class="app-layout__sidebar-header">
                  <flip-button class="app-layout__sidebar-close-button" hidelabel="" icon="<flip-icon-close></flip-icon-close>" intent="primary" label="Close sidebar"></flip-button>
                  <flip-heading as="h3" headingid="sidebar-heading" level="2"></flip-heading>
                </header>
                <div class="app-layout__sidebar-content">
                  <slot name="sidebar"></slot>
                </div>
              </aside>
            </div>
          </section>
        </mock:shadow-root>
      </flip-app-layout>
    `);
  });
});
