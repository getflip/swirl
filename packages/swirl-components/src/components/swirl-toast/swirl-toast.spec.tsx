import { newSpecPage } from "@stencil/core/testing";

import { SwirlToast } from "./swirl-toast";

describe("swirl-toast", () => {
  it("renders with icon and content", async () => {
    const page = await newSpecPage({
      components: [SwirlToast],
      html: `<swirl-toast content="Content" icon="<swirl-icon-mail></swirl-icon-mail>"></swirl-toast>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-toast content="Content" icon="<swirl-icon-mail></swirl-icon-mail>">
        <mock:shadow-root>
          <div class="toast toast--intent-default">
            <span class="toast__icon">
              <swirl-icon-mail></swirl-icon-mail>
            </span>
            <span class="toast__content">
              Content
            </span>
            <button aria-label="Dismiss" class="toast__dismiss-button" type="button">
              <swirl-icon-close></swirl-icon-close>
            </button>
          </div>
        </mock:shadow-root>
      </swirl-toast>
    `);
  });

  it("fires a 'dismiss' event", async () => {
    const page = await newSpecPage({
      components: [SwirlToast],
      html: `<swirl-toast content="Content"></swirl-toast>`,
    });

    const spy = jest.fn();

    page.root.addEventListener("dismiss", spy);
    page.root.shadowRoot.querySelector("button").click();

    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
  });
});
