import { newSpecPage } from "@stencil/core/testing";

import { SwirlLink } from "./swirl-link";

describe("swirl-link", () => {
  it("renders its label", async () => {
    const page = await newSpecPage({
      components: [SwirlLink],
      html: `<swirl-link href="/" label="Label"></swirl-link>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-link href="/" label="Label">
        <mock:shadow-root>
          <a class="link link--color-default" href="/" part="link">
            Label
          </a>
        </mock:shadow-root>
      </swirl-link>
    `);
  });
});
