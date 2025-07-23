import { newSpecPage } from "@stencil/core/testing";

import { SwirlToast } from "./swirl-toast";

describe("swirl-toast", () => {
  it("renders with icon and content", async () => {
    const page = await newSpecPage({
      components: [SwirlToast],
      html: `<swirl-toast icon="<swirl-icon-mail></swirl-icon-mail>">Content</swirl-toast>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-toast icon="<swirl-icon-mail></swirl-icon-mail>">
        <mock:shadow-root>
          <div class="toast toast--intent-default">
            <span class="toast__icon" part="toast__icon">
              <swirl-icon-mail size="24"></swirl-icon-mail>
            </span>
            <span class="toast__content" part="toast__content">
              <slot></slot>
            </span>
            <button aria-label="Dismiss" class="toast__dismiss-button" type="button">
              <swirl-icon-close size="24"></swirl-icon-close>
            </button>
          </div>
        </mock:shadow-root>
        Content
      </swirl-toast>
    `);
  });

  it("fires a 'dismiss' event", async () => {
    const page = await newSpecPage({
      components: [SwirlToast],
      html: `<swirl-toast>Content</swirl-toast>`,
    });

    const spy = jest.fn();

    page.root.addEventListener("dismiss", spy);
    page.root.shadowRoot.querySelector("button").click();

    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
  });

  it("dismisses after duration", async () => {
    const page = await newSpecPage({
      components: [SwirlToast],
      html: `<swirl-toast duration="100" toast-id="test-toast">Content</swirl-toast>`,
    });
    const spy = jest.fn();

    page.root.addEventListener("dismiss", spy);

    await new Promise((resolve) => setTimeout(resolve, 101));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: "test-toast",
      })
    );
  });

  it("does not dismiss when duration is set to Infinity", async () => {
    const page = await newSpecPage({
      components: [SwirlToast],
      html: `<swirl-toast duration="Infinity" toast-id="test-toast">Content</swirl-toast>`,
    });
    const spy = jest.fn();

    page.root.addEventListener("dismiss", spy);

    await new Promise((resolve) => setTimeout(resolve, 101));
    await page.waitForChanges();

    expect(spy).not.toHaveBeenCalled();
  });
});
