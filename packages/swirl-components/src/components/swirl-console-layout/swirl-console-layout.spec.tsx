import { newSpecPage } from "@stencil/core/testing";

import { SwirlConsoleLayout } from "./swirl-console-layout";

function mockMatchMedia(desktopViewport: boolean) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: query === "(min-width: 768px)" ? desktopViewport : false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

// "newSpecPage" resets the mock window, wiping its built-in storage. The mock
// is installed as a non-enumerable own property, so it survives the reset and
// allows seeding values before the page is created.
function mockLocalStorage() {
  const store = new Map<string, string>();

  Object.defineProperty(window, "localStorage", {
    configurable: true,
    value: {
      getItem: (key: string) => (store.has(key) ? store.get(key) : null),
      setItem: (key: string, value: string) => store.set(key, String(value)),
      removeItem: (key: string) => store.delete(key),
      clear: () => store.clear(),
    },
  });
}

describe("swirl-console-layout", () => {
  beforeEach(() => {
    mockMatchMedia(true);
    mockLocalStorage();
  });

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
          <div class="console-layout console-layout--sidebar-active">
            <swirl-sidebar-navigation appname="Admin" aria-hidden="false" class="console-layout__sidebar" collapsebuttonlabel="Hide main navigation" id="sidebar" navigationlabel="Main">
              <slot name="navigation"></slot>
              <slot name="user" slot="user"></slot>
            </swirl-sidebar-navigation>
            <main aria-labelledby="app-name" class="console-layout__main">
              <header class="console-layout__app-bar console-layout__app-bar--custom">
                <slot name="app-bar"></slot>
              </header>
              <header class="console-layout__app-bar">
                <span class="console-layout__mobile-navigation-button">
                  <swirl-button hidelabel="" icon="<swirl-icon-close></swirl-icon-close>" label="Hide main navigation" swirlariaexpanded="true"></swirl-button>
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

  it("hides the sidebar when its collapse button is clicked", async () => {
    const page = await newSpecPage({
      components: [SwirlConsoleLayout],
      html: `
        <swirl-console-layout app-name="App name" heading="Heading">
          <div slot="navigation">Navigation</div>
          <div slot="content">Content</div>
        </swirl-console-layout>
      `,
    });

    const spy = jest.fn();

    page.root.addEventListener("sidebarVisibilityChange", spy);

    const sidebar = page.root.shadowRoot.querySelector(
      "swirl-sidebar-navigation"
    );

    expect(page.root.shadowRoot.querySelector(".console-layout")).toHaveClass(
      "console-layout--sidebar-active"
    );

    expect(
      page.root.shadowRoot.querySelector(".console-layout__show-sidebar-button")
    ).toBeNull();

    sidebar.dispatchEvent(new CustomEvent("collapseButtonClick"));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toBe(false);

    expect(page.root.shadowRoot.querySelector(".console-layout")).toHaveClass(
      "console-layout--sidebar-hidden"
    );

    expect(sidebar.getAttribute("aria-hidden")).toBe("true");
    expect(sidebar.hasAttribute("inert")).toBe(true);

    expect(
      page.root.shadowRoot.querySelector(".console-layout__show-sidebar-button")
    ).not.toBeNull();

    expect(localStorage.getItem("SWIRL_CONSOLE_LAYOUT_SIDEBAR_STATE")).toBe(
      "false"
    );
  });

  it("shows the sidebar when the floating show button is clicked", async () => {
    localStorage.setItem("SWIRL_CONSOLE_LAYOUT_SIDEBAR_STATE", "false");

    const page = await newSpecPage({
      components: [SwirlConsoleLayout],
      html: `
        <swirl-console-layout app-name="App name" heading="Heading">
          <div slot="navigation">Navigation</div>
          <div slot="content">Content</div>
        </swirl-console-layout>
      `,
    });

    const spy = jest.fn();

    page.root.addEventListener("sidebarVisibilityChange", spy);

    page.root.shadowRoot
      .querySelector<HTMLButtonElement>(".console-layout__show-sidebar-button")
      .click();
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toBe(true);

    expect(page.root.shadowRoot.querySelector(".console-layout")).toHaveClass(
      "console-layout--sidebar-active"
    );

    const sidebar = page.root.shadowRoot.querySelector(
      "swirl-sidebar-navigation"
    );

    expect(sidebar.getAttribute("aria-hidden")).toBe("false");
    expect(sidebar.hasAttribute("inert")).toBe(false);

    expect(
      page.root.shadowRoot.querySelector(".console-layout__show-sidebar-button")
    ).toBeNull();

    expect(localStorage.getItem("SWIRL_CONSOLE_LAYOUT_SIDEBAR_STATE")).toBe(
      "true"
    );
  });

  it("restores the hidden sidebar state from localStorage", async () => {
    localStorage.setItem("SWIRL_CONSOLE_LAYOUT_SIDEBAR_STATE", "false");

    const page = await newSpecPage({
      components: [SwirlConsoleLayout],
      html: `
        <swirl-console-layout app-name="App name" heading="Heading">
          <div slot="navigation">Navigation</div>
          <div slot="content">Content</div>
        </swirl-console-layout>
      `,
    });

    expect(page.root.shadowRoot.querySelector(".console-layout")).toHaveClass(
      "console-layout--sidebar-hidden"
    );

    const sidebar = page.root.shadowRoot.querySelector(
      "swirl-sidebar-navigation"
    );

    expect(sidebar.getAttribute("aria-hidden")).toBe("true");
    expect(sidebar.hasAttribute("inert")).toBe(true);

    expect(
      page.root.shadowRoot.querySelector(".console-layout__show-sidebar-button")
    ).not.toBeNull();
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

  it("toggles the off-canvas sidebar on mobile viewports without persisting the state", async () => {
    mockMatchMedia(false);

    const page = await newSpecPage({
      components: [SwirlConsoleLayout],
      html: `
        <swirl-console-layout app-name="App name" heading="Heading">
          <div slot="navigation">Navigation</div>
          <div slot="content">Content</div>
        </swirl-console-layout>
      `,
    });

    const layout = page.root as HTMLSwirlConsoleLayoutElement;
    const layoutContainer =
      layout.shadowRoot.querySelector<HTMLElement>(".console-layout");
    const sidebar = layout.shadowRoot.querySelector("swirl-sidebar-navigation");

    const spy = jest.fn();

    layout.addEventListener("sidebarVisibilityChange", spy);

    // The drawer starts closed
    expect(layoutContainer).toHaveClass("console-layout--sidebar-hidden");
    expect(sidebar.getAttribute("aria-hidden")).toBe("true");
    expect(sidebar.hasAttribute("inert")).toBe(true);

    // toggleSidebar() opens the drawer
    await layout.toggleSidebar();
    await page.waitForChanges();

    expect(layoutContainer).toHaveClass("console-layout--sidebar-active");
    expect(sidebar.getAttribute("aria-hidden")).toBe("false");
    expect(sidebar.hasAttribute("inert")).toBe(false);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toBe(true);

    // Escape closes the drawer
    layoutContainer.dispatchEvent(
      new KeyboardEvent("keydown", { code: "Escape" })
    );
    await page.waitForChanges();

    expect(layoutContainer).toHaveClass("console-layout--sidebar-hidden");
    expect(sidebar.hasAttribute("inert")).toBe(true);
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.mock.calls[1][0].detail).toBe(false);

    // The app bar toggle reopens the drawer; its bubbling click must not
    // immediately close the drawer again via the outside click handler
    layout.shadowRoot
      .querySelector<HTMLElement>(
        ".console-layout__mobile-navigation-button swirl-button"
      )
      .click();
    await page.waitForChanges();

    expect(layoutContainer).toHaveClass("console-layout--sidebar-active");
    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy.mock.calls[2][0].detail).toBe(true);

    // A click outside the sidebar closes the drawer
    layout.shadowRoot
      .querySelector<HTMLElement>(".console-layout__content")
      .click();
    await page.waitForChanges();

    expect(layoutContainer).toHaveClass("console-layout--sidebar-hidden");
    expect(sidebar.hasAttribute("inert")).toBe(true);
    expect(spy).toHaveBeenCalledTimes(4);
    expect(spy.mock.calls[3][0].detail).toBe(false);

    // The mobile drawer state is never persisted
    expect(
      localStorage.getItem("SWIRL_CONSOLE_LAYOUT_SIDEBAR_STATE")
    ).toBeNull();
  });

  it("does not emit sidebarVisibilityChange for the initial visible state", async () => {
    const page = await newSpecPage({
      components: [SwirlConsoleLayout],
      html: "<div></div>",
    });

    const spy = jest.fn();

    // Attach the listener to the document before the component is created, so
    // any emission during initial load would be caught
    page.doc.addEventListener("sidebarVisibilityChange", spy);

    await page.setContent(`
      <swirl-console-layout app-name="App name" heading="Heading">
        <div slot="navigation">Navigation</div>
        <div slot="content">Content</div>
      </swirl-console-layout>
    `);
    await page.waitForChanges();

    const layout = page.body.querySelector<HTMLSwirlConsoleLayoutElement>(
      "swirl-console-layout"
    );

    // Sanity check: the component is hydrated with the sidebar visible
    expect(layout.shadowRoot.querySelector(".console-layout")).toHaveClass(
      "console-layout--sidebar-active"
    );

    expect(spy).not.toHaveBeenCalled();

    // Sanity check: the document level listener does catch actual changes
    await layout.hideSidebar();
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toBe(false);
  });

  it("does not emit sidebarVisibilityChange when restoring a hidden sidebar on load", async () => {
    localStorage.setItem("SWIRL_CONSOLE_LAYOUT_SIDEBAR_STATE", "false");

    const page = await newSpecPage({
      components: [SwirlConsoleLayout],
      html: "<div></div>",
    });

    const spy = jest.fn();

    page.doc.addEventListener("sidebarVisibilityChange", spy);

    await page.setContent(`
      <swirl-console-layout app-name="App name" heading="Heading">
        <div slot="navigation">Navigation</div>
        <div slot="content">Content</div>
      </swirl-console-layout>
    `);
    await page.waitForChanges();

    const layout = page.body.querySelector<HTMLSwirlConsoleLayoutElement>(
      "swirl-console-layout"
    );
    const sidebar = layout.shadowRoot.querySelector("swirl-sidebar-navigation");

    // Sanity check: the component is hydrated with the sidebar hidden
    expect(layout.shadowRoot.querySelector(".console-layout")).toHaveClass(
      "console-layout--sidebar-hidden"
    );
    expect(sidebar.hasAttribute("inert")).toBe(true);

    expect(spy).not.toHaveBeenCalled();
  });

  it("deactivates the sidebar when resizing to mobile and restores the stored state when resizing back to desktop", async () => {
    const page = await newSpecPage({
      components: [SwirlConsoleLayout],
      html: `
        <swirl-console-layout app-name="App name" heading="Heading">
          <div slot="navigation">Navigation</div>
          <div slot="content">Content</div>
        </swirl-console-layout>
      `,
    });

    const layoutContainer =
      page.root.shadowRoot.querySelector<HTMLElement>(".console-layout");
    const sidebar = page.root.shadowRoot.querySelector(
      "swirl-sidebar-navigation"
    );

    expect(layoutContainer).toHaveClass("console-layout--sidebar-active");

    // Resizing to a mobile viewport deactivates the sidebar
    mockMatchMedia(false);
    window.dispatchEvent(new Event("resize"));
    await page.waitForChanges();

    expect(layoutContainer).toHaveClass("console-layout--sidebar-hidden");
    expect(sidebar.hasAttribute("inert")).toBe(true);

    // Deactivating via resize must not overwrite the stored desktop state
    expect(
      localStorage.getItem("SWIRL_CONSOLE_LAYOUT_SIDEBAR_STATE")
    ).toBeNull();

    // Resizing back to a desktop viewport restores the stored state
    localStorage.setItem("SWIRL_CONSOLE_LAYOUT_SIDEBAR_STATE", "true");
    mockMatchMedia(true);
    window.dispatchEvent(new Event("resize"));
    await page.waitForChanges();

    expect(layoutContainer).toHaveClass("console-layout--sidebar-active");
    expect(sidebar.hasAttribute("inert")).toBe(false);
  });

  it("controls the desktop sidebar via the public methods and persists the state", async () => {
    const page = await newSpecPage({
      components: [SwirlConsoleLayout],
      html: `
        <swirl-console-layout app-name="App name" heading="Heading">
          <div slot="navigation">Navigation</div>
          <div slot="content">Content</div>
        </swirl-console-layout>
      `,
    });

    const layout = page.root as HTMLSwirlConsoleLayoutElement;
    const layoutContainer =
      layout.shadowRoot.querySelector<HTMLElement>(".console-layout");

    const spy = jest.fn();

    layout.addEventListener("sidebarVisibilityChange", spy);

    await layout.hideSidebar();
    await page.waitForChanges();

    expect(layoutContainer).toHaveClass("console-layout--sidebar-hidden");
    expect(localStorage.getItem("SWIRL_CONSOLE_LAYOUT_SIDEBAR_STATE")).toBe(
      "false"
    );
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toBe(false);

    // Hiding an already hidden sidebar is a no-op
    await layout.hideSidebar();
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);

    await layout.showSidebar();
    await page.waitForChanges();

    expect(layoutContainer).toHaveClass("console-layout--sidebar-active");
    expect(localStorage.getItem("SWIRL_CONSOLE_LAYOUT_SIDEBAR_STATE")).toBe(
      "true"
    );
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.mock.calls[1][0].detail).toBe(true);

    // Showing an already visible sidebar is a no-op
    await layout.showSidebar();
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(2);

    // toggleSidebar() flips the state back and forth
    await layout.toggleSidebar();
    await page.waitForChanges();

    expect(layoutContainer).toHaveClass("console-layout--sidebar-hidden");
    expect(localStorage.getItem("SWIRL_CONSOLE_LAYOUT_SIDEBAR_STATE")).toBe(
      "false"
    );

    await layout.toggleSidebar();
    await page.waitForChanges();

    expect(layoutContainer).toHaveClass("console-layout--sidebar-active");
    expect(localStorage.getItem("SWIRL_CONSOLE_LAYOUT_SIDEBAR_STATE")).toBe(
      "true"
    );

    expect(spy).toHaveBeenCalledTimes(4);
  });

  it("starts with a visible sidebar when no state is stored", async () => {
    const page = await newSpecPage({
      components: [SwirlConsoleLayout],
      html: `
        <swirl-console-layout app-name="App name" heading="Heading">
          <div slot="navigation">Navigation</div>
          <div slot="content">Content</div>
        </swirl-console-layout>
      `,
    });

    expect(
      localStorage.getItem("SWIRL_CONSOLE_LAYOUT_SIDEBAR_STATE")
    ).toBeNull();

    expect(page.root.shadowRoot.querySelector(".console-layout")).toHaveClass(
      "console-layout--sidebar-active"
    );
  });

  it("starts with a visible sidebar when the stored value is unknown", async () => {
    localStorage.setItem("SWIRL_CONSOLE_LAYOUT_SIDEBAR_STATE", "banana");

    const page = await newSpecPage({
      components: [SwirlConsoleLayout],
      html: `
        <swirl-console-layout app-name="App name" heading="Heading">
          <div slot="navigation">Navigation</div>
          <div slot="content">Content</div>
        </swirl-console-layout>
      `,
    });

    const sidebar = page.root.shadowRoot.querySelector(
      "swirl-sidebar-navigation"
    );

    expect(page.root.shadowRoot.querySelector(".console-layout")).toHaveClass(
      "console-layout--sidebar-active"
    );
    expect(sidebar.hasAttribute("inert")).toBe(false);
  });

  it("persists the sidebar state under a custom storage key", async () => {
    localStorage.setItem("CUSTOM_SIDEBAR_KEY", "false");

    const page = await newSpecPage({
      components: [SwirlConsoleLayout],
      html: `
        <swirl-console-layout app-name="App name" heading="Heading" sidebar-visibility-state-storage-key="CUSTOM_SIDEBAR_KEY">
          <div slot="navigation">Navigation</div>
          <div slot="content">Content</div>
        </swirl-console-layout>
      `,
    });

    const layout = page.root as HTMLSwirlConsoleLayoutElement;

    // The initial state is read from the custom key
    expect(layout.shadowRoot.querySelector(".console-layout")).toHaveClass(
      "console-layout--sidebar-hidden"
    );

    await layout.showSidebar();
    await page.waitForChanges();

    // The state is persisted under the custom key, not the default one
    expect(localStorage.getItem("CUSTOM_SIDEBAR_KEY")).toBe("true");
    expect(
      localStorage.getItem("SWIRL_CONSOLE_LAYOUT_SIDEBAR_STATE")
    ).toBeNull();
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
