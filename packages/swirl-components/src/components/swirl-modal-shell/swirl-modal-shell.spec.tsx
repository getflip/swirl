import { newSpecPage } from "@stencil/core/testing";
import { SwirlModalShell } from "./swirl-modal-shell";

describe("swirl-modal-shell", () => {
  it("renders the modal with content and close button", async () => {
    const page = await newSpecPage({
      components: [SwirlModalShell],
      html: `<swirl-modal-shell label="Modal" close-button-label="Close">Content</swirl-modal-shell>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-modal-shell label="Modal" close-button-label="Close">
        <dialog aria-label="Modal" class="modal-shell modal-shell--closing" closedby="none">
          <div class="modal-shell__backdrop"></div>
          <div class="modal-shell__scroll-container">
            <div class="modal-shell__scroll-container__content">
              Content
            </div>
          </div>
          <swirl-button class="modal-shell__close-button" hidelabel="" icon="<swirl-icon-close color='strong'></swirl-icon-close>" label="Close" variant="translucent"></swirl-button>
        </dialog>
      </swirl-modal-shell>
    `);
  });

  it("fires the close event on button click and pressing the escape key", async () => {
    let page = await newSpecPage({
      components: [SwirlModalShell],
      html: `<swirl-modal-shell label="Modal" close-button-aria-label="Close">Content</swirl-modal-shell>`,
    });

    const closeModalSpy = jest.fn();
    const dialog = page.root.querySelector("dialog");

    dialog.close = jest.fn(() => {
      dialog.dispatchEvent(new Event("close"));
    });

    const closeButton =
      page.root.querySelector<HTMLSwirlButtonElement>("swirl-button");

    page.root.addEventListener("closeModal", closeModalSpy);

    closeButton.click();
    dialog.dispatchEvent(new KeyboardEvent("keydown", { code: "Escape" }));

    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(closeModalSpy).toHaveBeenCalledTimes(2);
  });
});
