import { newSpecPage } from "@stencil/core/testing";

import { SwirlShellLayout } from "./swirl-shell-layout";

describe("swirl-shell-layout", () => {
  it("renders its content", async () => {
    const page = await newSpecPage({
      components: [SwirlShellLayout],
      html: `<swirl-shell-layout main-navigation-label="Test">
        <div slot="logo-expanded">Expanded logo</div>
        <div slot="logo-collapsed">Collapsed logo</div>
        <div slot="tools">Tools</div>
        <div slot="main-navigation">Main navigation</div>
        <div slot="main">Main</div>
      </swirl-shell-layout>`,
    });

    expect(page.root).toEqualHtml(``);
  });
});
