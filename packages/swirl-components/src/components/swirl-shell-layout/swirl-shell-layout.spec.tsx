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
});
