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
          <div class="toast toast--action-position-inline toast--intent-default">
            <span class="toast__icon" part="toast__icon">
              <swirl-icon-mail size="24"></swirl-icon-mail>
            </span>
            <span class="toast__content-container">
              <span class="toast__content" part="toast__content">
                <slot></slot>
              </span>
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

  it("keeps its auto-dismiss timer when moved in the DOM", async () => {
    const page = await newSpecPage({
      components: [SwirlToast],
      html: `
        <div id="a"><swirl-toast duration="100" toast-id="test-toast">Content</swirl-toast></div>
        <div id="b"></div>
      `,
    });
    const toast = page.body.querySelector("swirl-toast");
    const spy = jest.fn();

    toast.addEventListener("dismiss", spy);

    await new Promise((resolve) => setTimeout(resolve, 50));

    page.body.querySelector("#b").appendChild(toast);
    await page.waitForChanges();

    await new Promise((resolve) => setTimeout(resolve, 51));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: "test-toast",
      })
    );
  });

  it("clears its auto-dismiss timer when removed from the DOM", async () => {
    const page = await newSpecPage({
      components: [SwirlToast],
      html: `<swirl-toast duration="100" toast-id="test-toast">Content</swirl-toast>`,
    });
    const toast = page.root;
    const spy = jest.fn();

    toast.addEventListener("dismiss", spy);
    toast.remove();

    await new Promise((resolve) => setTimeout(resolve, 101));
    await page.waitForChanges();

    expect(spy).not.toHaveBeenCalled();
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

  it("renders action button when actionLabel is provided", async () => {
    const page = await newSpecPage({
      components: [SwirlToast],
      html: `<swirl-toast action-label="Undo" toast-id="test-toast">Content</swirl-toast>`,
    });

    const actionButton = page.root.shadowRoot.querySelector(
      ".toast__action-button"
    );

    expect(actionButton).not.toBeNull();
    expect(actionButton.getAttribute("label")).toBe("Undo");
  });

  it("does not render action button when actionLabel is not provided", async () => {
    const page = await newSpecPage({
      components: [SwirlToast],
      html: `<swirl-toast toast-id="test-toast">Content</swirl-toast>`,
    });

    const actionButton = page.root.shadowRoot.querySelector(
      ".toast__action-button"
    );

    expect(actionButton).toBeNull();
  });

  it("fires an 'action' event when action button is clicked", async () => {
    const page = await newSpecPage({
      components: [SwirlToast],
      html: `<swirl-toast action-label="Undo" toast-id="test-toast">Content</swirl-toast>`,
    });

    const spy = jest.fn();

    page.root.addEventListener("action", spy);

    const actionButton = page.root.shadowRoot.querySelector(
      ".toast__action-button"
    ) as HTMLElement;
    actionButton.click();

    await page.waitForChanges();

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: "test-toast",
      })
    );
  });
});
