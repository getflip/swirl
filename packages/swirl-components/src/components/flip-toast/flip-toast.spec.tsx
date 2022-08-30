import { newSpecPage } from "@stencil/core/testing";

import { FlipToast } from "./flip-toast";

describe("flip-toast", () => {
  it("renders with icon and content", async () => {
    const page = await newSpecPage({
      components: [FlipToast],
      html: `<flip-toast content="Content" icon="<flip-icon-mail></flip-icon-mail>"></flip-toast>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-toast content="Content" icon="<flip-icon-mail></flip-icon-mail>" role="status">
        <mock:shadow-root>
          <div class="toast toast--intent-default">
            <span class="toast__icon">
              <flip-icon-mail></flip-icon-mail>
            </span>
            <span class="toast__content">
              Content
            </span>
            <button aria-label="Dismiss" class="toast__dismiss-button" type="button">
              <flip-icon-close></flip-icon-close>
            </button>
          </div>
        </mock:shadow-root>
      </flip-toast>
    `);
  });

  it("fires a 'dismiss' event", async () => {
    const page = await newSpecPage({
      components: [FlipToast],
      html: `<flip-toast content="Content"></flip-toast>`,
    });

    const spy = jest.fn();

    page.root.addEventListener("dismiss", spy);
    page.root.shadowRoot.querySelector("button").click();

    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
  });
});
