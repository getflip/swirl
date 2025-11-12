import { newSpecPage } from "@stencil/core/testing";
import { SwirlTranslucentOverlay } from "./swirl-translucent-overlay";

describe("swirl-translucent-overlay", () => {
  it("renders the overlay with content and close button", async () => {
    const page = await newSpecPage({
      components: [SwirlTranslucentOverlay],
      html: `<swirl-translucent-overlay overlay-aria-label="Overlay" close-button-aria-label="Close">Content</swirl-translucent-overlay>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-translucent-overlay overlay-aria-label="Overlay" close-button-aria-label="Close">
        <section aria-label="Overlay" role="dialog" aria-modal="true" class="overlay overlay--closing">
          <div class="overlay__backdrop"></div>
          <div class="overlay__content">
            <swirl-box paddingblockend="16" paddingblockstart="16">
              <swirl-button hidelabel="" icon="<swirl-icon-close color='strong'></swirl-icon-close>" label="Close" variant="plain"></swirl-button>
            </swirl-box>
            Content
          </div>
        </section>
      </swirl-translucent-overlay>
    `);
  });

  it("fires the close event on button click and pressing the escape key", async () => {
    let page = await newSpecPage({
      components: [SwirlTranslucentOverlay],
      html: `<swirl-translucent-overlay overlay-aria-label="Overlay" close-button-aria-label="Close">Content</swirl-translucent-overlay>`,
    });

    const closeOverlaySpy = jest.fn();

    const closeButton =
      page.root.querySelector<HTMLSwirlButtonElement>("swirl-button");

    page.root.addEventListener("closeOverlay", closeOverlaySpy);

    closeButton.click();
    page.root
      .querySelector(".overlay")
      .dispatchEvent(new KeyboardEvent("keydown", { code: "Escape" }));

    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(closeOverlaySpy).toHaveBeenCalledTimes(2);
  });
});
