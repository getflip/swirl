import { newSpecPage } from "@stencil/core/testing";

import { FlipButton } from "./flip-button";

describe("flip-button", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [FlipButton],
      html: `<flip-button label="Label"></flip-button>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-button label=\"Label\">
        <mock:shadow-root>
          <button class=\"button\" type=\"button\">
            <span class="button__label">
              Label
            </span>
          </button>
        </mock:shadow-root>
      </flip-button>
    `);
  });
});
