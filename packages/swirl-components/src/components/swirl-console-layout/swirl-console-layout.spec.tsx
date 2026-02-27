import { newSpecPage } from "@stencil/core/testing";

import { SwirlConsoleLayout } from "./swirl-console-layout";

describe("swirl-console-layout", () => {
  it("renders its contents", async () => {
    const page = await newSpecPage({
      components: [SwirlConsoleLayout],
      html: `
        <swirl-console-layout app-name="App name" heading="Heading">
          <swirl-box padding="24" slot="navigation">Navigation</swirl-box>
          <div slot="user">User</div>
          <div slot="content">Content</div>
        </swirl-console-layout>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-console-layout app-name="App name" heading="Heading">
        <mock:shadow-root>
          <div class="console-layout">
            <header aria-hidden="true" class="console-layout__sidebar" inert="">
              <div class="console-layout__header">
                <div class="console-layout__logo">
                  <svg class="console-layout__logo-mark" fill="none" height="26" viewBox="0 0 301 460" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" d="M2.52486 276.36C5.57709 289.149 11.02 301.094 18.2296 311.628L258.719 138.748C269.874 131.507 278.35 121.993 285.395 110.766C291.904 100.212 296.922 87.3014 298.875 74.6738C300.769 61.4277 300.809 48.353 297.757 35.5639C294.705 22.7748 289.262 10.8302 282.052 0.296051L41.5626 173.176C30.4077 180.417 21.9314 189.931 14.8867 201.158C8.37746 211.712 3.35926 224.623 1.40724 237.25C-0.544773 249.878 0.0338964 262.896 2.52486 276.36ZM80.3121 424.184C83.3644 436.973 88.8073 448.918 96.0169 459.452L229.113 363.743C240.268 356.502 248.744 346.988 255.789 335.761C262.298 325.207 267.317 312.296 269.269 299.668C271.164 286.422 271.203 273.348 268.151 260.559C265.099 247.769 259.656 235.825 252.446 225.291L119.35 320.999C108.195 328.24 99.7187 337.755 92.674 348.982C86.1647 359.535 81.1465 372.446 79.1945 385.074C77.2996 398.32 77.2599 411.395 80.3121 424.184Z" fill="#2151F5" fill-rule="evenodd"></path>
                  </svg>
                  <swirl-text class="console-layout__logo-text" weight="medium">
                    Admin
                  </swirl-text>
                </div>
              </div>
              <nav aria-label="Main" class="console-layout__navigation">
                <slot name="navigation"></slot>
              </nav>
              <div class="console-layout__user">
                <slot name="user"></slot>
              </div>
            </header>
            <main aria-labelledby="app-name" class="console-layout__main">
              <header class="console-layout__app-bar console-layout__app-bar--custom">
                <slot name="app-bar"></slot>
              </header>
              <header class="console-layout__app-bar">
                <span class="console-layout__mobile-navigation-button">
                  <swirl-button hidelabel="" icon="<swirl-icon-menu></swirl-icon-menu>" label="Show main navigation" swirlariaexpanded="false"></swirl-button>
                </span>
                <div class="console-layout__app-name">
                  <swirl-heading as="h1" headingid="app-name" level="4" text="App name"></swirl-heading>
                </div>
              </header>
              <section aria-labelledby="heading" class="console-layout__content">
                <div class="console-layout__content-container">
                  <header class="console-layout__content-header">
                    <div class="console-layout__heading-container">
                      <swirl-heading as="h2" class="console-layout__heading" headingid="heading" level="1" text="Heading"></swirl-heading>
                    </div>
                    <div class="console-layout__content-header-tools">
                      <slot name="content-header-tools"></slot>
                    </div>
                  </header>
                  <div class="console-layout__integration">
                    <slot name="content"></slot>
                  </div>
                </div>
              </section>
              <footer class="console-layout__footer">
                <slot name="footer"></slot>
              </footer>
              <div class="console-layout__overlays">
                <slot name="overlays"></slot>
              </div>
            </main>
          </div>
        </mock:shadow-root>
        <swirl-box padding="24" slot="navigation">
          Navigation
        </swirl-box>
        <div slot="user">
          User
        </div>
        <div slot="content">
          Content
        </div>
      </swirl-console-layout>
    `);
  });

  it("fires help button event", async () => {
    const page = await newSpecPage({
      components: [SwirlConsoleLayout],
      html: `
        <swirl-console-layout app-name="App name" heading="Heading" show-help-button="true">
          <swirl-box padding="24" slot="navigation">Navigation</swirl-box>
          <div slot="user">User</div>
          <div slot="content">Content</div>
        </swirl-console-layout>
      `,
    });

    const spy = jest.fn();

    page.root.addEventListener("helpButtonClick", spy);

    page.root.shadowRoot
      .querySelector<HTMLSwirlButtonElement>(".console-layout__help-button")
      .click();

    expect(spy).toHaveBeenCalled();
  });

  it("fires back button event", async () => {
    const page = await newSpecPage({
      components: [SwirlConsoleLayout],
      html: `
        <swirl-console-layout app-name="App name" heading="Heading" show-back-button="true">
          <swirl-box padding="24" slot="navigation">Navigation</swirl-box>
          <div slot="user">User</div>
          <div slot="content">Content</div>
        </swirl-console-layout>
      `,
    });

    const spy = jest.fn();

    page.root.addEventListener("backButtonClick", spy);

    page.root.shadowRoot
      .querySelector<HTMLSwirlButtonElement>(".console-layout__back-button")
      .click();

    expect(spy).toHaveBeenCalled();
  });

  it("renders custom app bar slot and hides default app bar", async () => {
    const page = await newSpecPage({
      components: [SwirlConsoleLayout],
      html: `
        <swirl-console-layout app-name="App name" heading="Heading">
          <div slot="app-bar">Custom App Bar Content</div>
          <div slot="navigation">Navigation</div>
          <div slot="content">Content</div>
        </swirl-console-layout>
      `,
    });

    const shadowRoot = page.root.shadowRoot;

    // Check that custom app bar is rendered and visible
    const customAppBar = shadowRoot.querySelector(
      ".console-layout__app-bar--custom"
    );
    expect(customAppBar).not.toBeNull();
    expect(customAppBar.textContent.trim()).toBe("");

    // Check that the component has the correct CSS class
    const layoutContainer = shadowRoot.querySelector(".console-layout");
    expect(layoutContainer).toHaveClass("console-layout--has-custom-app-bar");

    // Check that default app bar exists and
    // has the correct class that would apply display: none
    const defaultAppBar = shadowRoot.querySelector(
      ".console-layout__app-bar:not(.console-layout__app-bar--custom)"
    );
    expect(defaultAppBar).not.toBeNull();
  });

  it("renders footer slot when footer content is provided", async () => {
    const page = await newSpecPage({
      components: [SwirlConsoleLayout],
      html: `
        <swirl-console-layout app-name="App name" heading="Heading">
          <div slot="navigation">Navigation</div>
          <div slot="content">Content</div>
          <div slot="footer">Footer Content</div>
        </swirl-console-layout>
      `,
    });

    const shadowRoot = page.root.shadowRoot;

    // Check that footer is rendered
    const footer = shadowRoot.querySelector(".console-layout__footer");
    expect(footer).not.toBeNull();
    expect(footer.textContent.trim()).toBe("");

    // Check that the component has the correct CSS class
    const layoutContainer = shadowRoot.querySelector(".console-layout");
    expect(layoutContainer).toHaveClass("console-layout--has-footer");
  });

  it("renders both slots but applies correct CSS classes for hiding empty ones", async () => {
    const page = await newSpecPage({
      components: [SwirlConsoleLayout],
      html: `
        <swirl-console-layout app-name="App name" heading="Heading">
          <div slot="navigation">Navigation</div>
          <div slot="content">Content</div>
        </swirl-console-layout>
      `,
    });

    const shadowRoot = page.root.shadowRoot;
    const layoutContainer = shadowRoot.querySelector(".console-layout");

    // Check that custom app bar slot is always rendered
    const customAppBar = shadowRoot.querySelector(
      ".console-layout__app-bar--custom"
    );
    expect(customAppBar).not.toBeNull();

    // Check that footer slot is always rendered
    const footer = shadowRoot.querySelector(".console-layout__footer");
    expect(footer).not.toBeNull();

    // Check that default app bar is rendered and visible (no custom app bar class)
    const defaultAppBar = shadowRoot.querySelector(
      ".console-layout__app-bar:not(.console-layout__app-bar--custom)"
    );
    expect(defaultAppBar).not.toBeNull();

    // Verify CSS classes are NOT applied when slots are empty
    expect(layoutContainer).not.toHaveClass(
      "console-layout--has-custom-app-bar"
    );
    expect(layoutContainer).not.toHaveClass("console-layout--has-footer");
  });

  it("hides content header and applies hide content header class when hideContentHeader is true", async () => {
    const page = await newSpecPage({
      components: [SwirlConsoleLayout],
      html: `
        <swirl-console-layout app-name="App name" heading="Heading" hide-content-header="true">
          <div slot="navigation">Navigation</div>
          <div slot="content">Content</div>
        </swirl-console-layout>
      `,
    });

    const shadowRoot = page.root.shadowRoot;
    const layoutContainer = shadowRoot.querySelector(".console-layout");

    // Check that the hide content header CSS class is applied
    expect(layoutContainer).toHaveClass("console-layout--hide-content-header");

    // Check that the content header is not rendered
    const contentHeader = shadowRoot.querySelector(
      ".console-layout__content-header"
    );
    expect(contentHeader).toBeNull();

    // Check that the content integration div is still rendered
    const contentIntegration = shadowRoot.querySelector(
      ".console-layout__integration"
    );
    expect(contentIntegration).not.toBeNull();
  });
});
