import { newSpecPage } from "@stencil/core/testing";

import { SwirlShellLayout } from "./swirl-shell-layout";

(global as any).MutationObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
};

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
      </swirl-shell-layout>`,
    });

    expect(page.root.innerHTML).toContain("Logo");
    expect(page.root.innerHTML).toContain("Mobile logo");
    expect(page.root.innerHTML).toContain("Tools");
    expect(page.root.innerHTML).toContain("nav");
    expect(page.root.innerHTML).toContain("Main");
  });

  it("triggers historyBackClick events", async () => {
    const page = await newSpecPage({
      components: [SwirlShellLayout],
      html: `<swirl-shell-layout main-navigation-label="Test"></swirl-shell-layout>`,
    });

    const spy = jest.fn();
    page.root.addEventListener("historyBackClick", spy);

    const historyBackLink = page.root.querySelectorAll(
      ".shell-layout__header-tool[href]"
    )[0] as HTMLElement;

    historyBackLink.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("triggers historyForwardClick events", async () => {
    const page = await newSpecPage({
      components: [SwirlShellLayout],
      html: `<swirl-shell-layout main-navigation-label="Test"></swirl-shell-layout>`,
    });

    const spy = jest.fn();
    page.root.addEventListener("historyForwardClick", spy);

    const historyForwardLink = page.root.querySelectorAll(
      ".shell-layout__header-tool[href]"
    )[1] as HTMLElement;

    historyForwardLink.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("triggers skipLinkClick events", async () => {
    const page = await newSpecPage({
      components: [SwirlShellLayout],
      html: `<swirl-shell-layout main-navigation-label="Test"></swirl-shell-layout>`,
    });

    const spy = jest.fn();
    page.root.addEventListener("skipLinkClick", spy);

    const skipLinkButton = page.root.querySelector(
      ".shell-layout__skip-link"
    ) as HTMLElement;

    skipLinkButton.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
