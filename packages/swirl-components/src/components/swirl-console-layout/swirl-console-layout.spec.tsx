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
                  <svg class="console-layout__logo-mark" fill="none" height="26" viewBox="0 0 16 26" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.624238 14.0705C0.326496 13.5353 0.118077 12.9406 0.0287543 12.3161C-0.0307941 11.662 -0.0010199 11.0375 0.147851 10.4428C0.296722 9.84813 0.594464 9.25343 0.951754 8.77767C1.33882 8.27217 1.78543 7.85588 2.35114 7.55853L14.6181 0.362671C14.9159 0.8979 15.1243 1.4926 15.2136 2.11703C15.3029 2.74147 15.2434 3.3659 15.0945 3.99034C14.9456 4.58504 14.6479 5.17974 14.2906 5.6555C13.9035 6.16099 13.4569 6.57728 12.8912 6.87463L0.624238 14.0705Z" fill="#145AF5"></path>
                    <path d="M3.69214 21.4743C3.3944 20.9391 3.18598 20.3444 3.09666 19.72C3.00733 19.0956 3.06688 18.4711 3.21575 17.8467C3.36462 17.252 3.66237 16.6573 4.01966 16.1815C4.40672 15.676 4.85333 15.2597 5.41904 14.9624L12.2076 10.9779C12.5053 11.5131 12.7137 12.1078 12.803 12.7323C12.8924 13.3567 12.8328 13.9811 12.6839 14.6056C12.5351 15.2003 12.2373 15.795 11.88 16.2707C11.493 16.7762 11.0464 17.1925 10.4807 17.4899L3.69214 21.4743Z" fill="#145AF5"></path>
                    <path d="M3.69141 21.4739L7.77047 19.0951C8.39573 20.1953 8.5446 21.5036 8.24686 22.7228C7.91934 23.9419 7.14521 24.9826 6.04357 25.6368L3.69141 21.4739Z" fill="#80A8F4"></path>
                    <path d="M12.2072 10.9785L7.32419 10.1459L0.625 14.0709L5.38887 14.9629L12.2072 10.9785Z" fill="#80A8F4"></path>
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
});
