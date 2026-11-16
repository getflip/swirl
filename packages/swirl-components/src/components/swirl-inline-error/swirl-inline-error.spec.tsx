import { newSpecPage } from "@stencil/core/testing";

import { SwirlInlineError } from "./swirl-inline-error";

describe("swirl-inline-error", () => {
  it("displays the error message and icon", async () => {
    const page = await newSpecPage({
      components: [SwirlInlineError],
      html: `<swirl-inline-error message="The error message." size="m"></swirl-inline-error>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-inline-error message="The error message." size="m">
        <mock:shadow-root>
          <span class="inline-error inline-error--size-m" part="inline-error">
            <span class="inline-error__icon">
              <swirl-icon-error size="24"></swirl-icon-error>
            </span>
            <span class="inline-error__message">
              The error message.
            </span>
          </span>
        </mock:shadow-root>
      </swirl-inline-error>
    `);
  });

  it("renders the xs size with a small icon", async () => {
    const page = await newSpecPage({
      components: [SwirlInlineError],
      html: `<swirl-inline-error message="The error message." size="xs"></swirl-inline-error>`,
    });

    const container = page.root.shadowRoot.querySelector(".inline-error");
    const icon = page.root.shadowRoot.querySelector("swirl-icon-error");

    expect(container.classList.contains("inline-error--size-xs")).toBe(true);
    expect(icon.getAttribute("size")).toBe("16");
  });
});
