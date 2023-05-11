import { newSpecPage } from "@stencil/core/testing";

import { SwirlMenu } from "./swirl-menu";

(global as any).DocumentFragment = class DocumentFragment extends Node {};
(global as any).ShadowRoot = class ShadowRoot extends DocumentFragment {};

(global as any).MutationObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
};

describe.skip("swirl-menu", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [SwirlMenu],
      html: `<swirl-menu></swirl-menu>`,
    });

    expect(page.root).toEqualHtml(``);
  });
});
