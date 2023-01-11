import { newSpecPage } from "@stencil/core/testing";

import { FlipLink } from "./swirl-link";

describe("flip-link", () => {
  it("renders its label", async () => {
    const page = await newSpecPage({
      components: [FlipLink],
      html: `<flip-link href="/" label="Label"></flip-link>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-link href="/" label="Label">
        <mock:shadow-root>
          <a class="link" href="/">
            Label
          </a>
        </mock:shadow-root>
      </flip-link>
    `);
  });
});
