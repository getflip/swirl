import { newSpecPage } from "@stencil/core/testing";

import { FlipInlineError } from "./swirl-inline-error";

describe("flip-inline-error", () => {
  it("displays the error message and icon", async () => {
    const page = await newSpecPage({
      components: [FlipInlineError],
      html: `<flip-inline-error message="The error message." size="m"></flip-inline-error>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-inline-error message=\"The error message.\" size=\"m\">
        <mock:shadow-root>
          <span class=\"inline-error inline-error--size-m\">
            <span class=\"inline-error__icon\">
              <flip-icon-error size=\"24\"></flip-icon-error>
            </span>
            <span class=\"inline-error__message\">
              The error message.
            </span>
          </span>
        </mock:shadow-root>
      </flip-inline-error>
    `);
  });
});
