import { newSpecPage } from "@stencil/core/testing";

import { SwirlAppLayout } from "./swirl-app-layout";

(global as any).MutationObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
};

describe("swirl-app-layout", () => {
  it("renders navigation area if provided", async () => {
    const page = await newSpecPage({
      components: [SwirlAppLayout],
      html: `
        <swirl-app-layout app-name="App">
          <div slot="navigation">Navigation</div>
        </swirl-app-layout>
      `,
    });

    const navigationArea = page.root.shadowRoot.querySelector(
      ".app-layout__navigation"
    );

    expect(
      page.root.shadowRoot.children[0].classList.contains(
        "app-layout--has-navigation"
      )
    ).toBeTruthy();

    expect(
      page.root.shadowRoot.querySelector(".app-layout__header")
    ).not.toBeNull();

    expect(navigationArea).not.toBeNull();

    const pageWithoutNavigation = await newSpecPage({
      components: [SwirlAppLayout],
      html: `<swirl-app-layout app-name="App"></swirl-app-layout>`,
    });

    expect(
      pageWithoutNavigation.root.shadowRoot.children[0].classList.contains(
        "app-layout--has-navigation"
      )
    ).toBeFalsy();
  });

  it("renders sidebar area if provided", async () => {
    const page = await newSpecPage({
      components: [SwirlAppLayout],
      html: `
        <swirl-app-layout app-name="App" sidebar-heading="Sidebar">
          <div slot="sidebar">Sidebar</div>
        </swirl-app-layout>
      `,
    });

    const sidebarArea = page.root.shadowRoot.querySelector(
      ".app-layout__sidebar"
    );

    const sidebarHeading = sidebarArea.querySelector("swirl-heading");

    expect(
      page.root.shadowRoot.children[0].classList.contains(
        "app-layout--has-sidebar"
      )
    ).toBeTruthy();

    expect(sidebarArea).not.toBeNull();
    expect(sidebarHeading.getAttribute("as")).toBe("h3");
    expect(sidebarHeading.getAttribute("text")).toBe("Sidebar");

    const pageWithoutSidebar = await newSpecPage({
      components: [SwirlAppLayout],
      html: `<swirl-app-layout app-name="App"></swirl-app-layout>`,
    });

    expect(
      pageWithoutSidebar.root.shadowRoot.children[0].classList.contains(
        "app-layout--has-sidebar"
      )
    ).toBeFalsy();
  });

  it("renders floating action button", async () => {
    const page = await newSpecPage({
      components: [SwirlAppLayout],
      html: `
        <swirl-app-layout app-name="App" cta-icon="<swirl-icon-add></swirl-icon-add>" cta-label="CTA"></swirl-app-layout>
      `,
    });

    const spy = jest.fn();

    const cta = page.root.shadowRoot.querySelector(
      ".app-layout__floating-action-button"
    ).children[0] as HTMLSwirlButtonElement;

    page.root.addEventListener("ctaClick", spy);

    expect(cta).not.toBeNull();
    expect(cta.getAttribute("icon")).toBe("<swirl-icon-add></swirl-icon-add>");
    expect(cta.getAttribute("label")).toBe("CTA");

    cta.click();

    expect(spy).toHaveBeenCalled();
  });

  it("renders the app name", async () => {
    const page = await newSpecPage({
      components: [SwirlAppLayout],
      html: `
        <swirl-app-layout app-name="App"></swirl-app-layout>
      `,
    });

    const heading = page.root.shadowRoot.querySelector("swirl-heading");

    expect(heading.getAttribute("as")).toBe("h1");
    expect(heading.getAttribute("text")).toBe("App");
  });

  it("renders the app bar", async () => {
    const page = await newSpecPage({
      components: [SwirlAppLayout],
      html: `
        <swirl-app-layout app-name="App">
          <div slot="app-bar">App bar</div>
          <div slot="app-bar-controls">Controls</div>
          <div slot="navigation">Navigation</div>
        </swirl-app-layout>
      `,
    });

    const appBar = page.root.shadowRoot.querySelector(".app-layout__app-bar");

    expect(appBar).not.toBeNull();
  });

  it("applies default sidebar positioning class", async () => {
    const page = await newSpecPage({
      components: [SwirlAppLayout],
      html: `<swirl-app-layout app-name="App"></swirl-app-layout>`,
    });

    expect(
      page.root.shadowRoot.children[0].classList.contains(
        "app-layout--sidebar-positioning-auto"
      )
    ).toBeTruthy();
  });

  it("applies overlay sidebar positioning class", async () => {
    const page = await newSpecPage({
      components: [SwirlAppLayout],
      html: `<swirl-app-layout app-name="App" sidebar-positioning="overlay"></swirl-app-layout>`,
    });

    expect(
      page.root.shadowRoot.children[0].classList.contains(
        "app-layout--sidebar-positioning-overlay"
      )
    ).toBeTruthy();
  });

  it("changes the mobile view", async () => {
    const page = await newSpecPage({
      components: [SwirlAppLayout],
      html: `
        <swirl-app-layout app-name="App" heading="Heading" sidebar-heading="Sidebar" transition-style="none">
          <div slot="navigation">Navigation</div>
          <div slot="content">Content</div>
          <div slot="sidebar">Sidebar</div>
        </swirl-app-layout>
      `,
    });

    const container = page.root.shadowRoot.children[0];
    const root = page.root as HTMLSwirlAppLayoutElement;
    const spy = jest.fn();

    page.root.addEventListener("mobileViewChange", spy);

    expect(
      container.classList.contains("app-layout--mobile-view-navigation")
    ).toBeTruthy();

    await root.changeMobileView("body");
    await new Promise((resolve) => setTimeout(resolve));
    await page.waitForChanges();

    expect(
      container.classList.contains("app-layout--mobile-view-body")
    ).toBeTruthy();

    await root.changeMobileView("sidebar");
    await new Promise((resolve) => setTimeout(resolve));
    await page.waitForChanges();

    expect(
      container.classList.contains("app-layout--mobile-view-sidebar")
    ).toBeTruthy();

    expect(spy.mock.calls[0][0].detail).toBe("body");
    expect(spy.mock.calls[1][0].detail).toBe("sidebar");
  });
});
