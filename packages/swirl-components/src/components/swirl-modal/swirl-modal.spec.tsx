import { newSpecPage } from "@stencil/core/testing";

import { SwirlModal } from "./swirl-modal";

describe("swirl-modal", () => {
  it("renders content and heading", async () => {
    const page = await newSpecPage({
      components: [SwirlModal],
      html: `<swirl-modal label="Dialog">Content</swirl-modal>`,
    });

    expect(page.root).toEqualHtml(`
     <swirl-modal label="Dialog">
  <section
    aria-hidden="true"
    aria-label="Dialog"
    aria-modal="true"
    class="modal modal--padded modal--sidebar-footer-padded modal--sidebar-padded modal--variant-default"
    role="dialog"
  >
    <div class="modal__backdrop"></div>
    <div class="modal__body">
      <aside class="modal__sidebar">
        <div class="modal__sidebar-content"></div>
        <div class="modal__sidebar-footer"></div>
      </aside>
      <div class="modal__main-content">
        <header class="modal__custom-header"></header>
        <header class="modal__header">
          <div class="modal__header-bar">
            <swirl-button
              class="modal__close-button"
              hidelabel=""
              icon="<swirl-icon-close></swirl-icon-close>"
              label="Close modal"
            ></swirl-button>
            <swirl-heading
              as="h2"
              class="modal__heading"
              level="3"
              text="Dialog"
            ></swirl-heading>
          </div>
        </header>
        <div class="modal__content-container">
          <div class="modal__primary-content">
            <div class="modal__header-tools"></div>
            <div class="modal__content">Content</div>
          </div>
          <div class="modal__secondary-content"></div>
        </div>
        <div class="modal__custom-footer"></div>
      </div>
    </div>
  </section>
</swirl-modal>
    `);
  });

  it("renders controls and fires events", async () => {
    const page = await newSpecPage({
      components: [SwirlModal],
      html: `<swirl-modal label="Dialog" primary-action-label="Primary" secondary-action-label="Secondary">Content</swirl-modal>`,
    });

    const primarySpy = jest.fn();
    const secondarySpy = jest.fn();

    const buttons = page.root.querySelectorAll<HTMLSwirlButtonElement>(
      ".modal__controls swirl-button"
    );

    page.root.addEventListener("primaryAction", primarySpy);
    page.root.addEventListener("secondaryAction", secondarySpy);

    buttons[0].click();
    buttons[1].click();

    expect(buttons[0].getAttribute("label")).toEqual("Secondary");
    expect(buttons[1].getAttribute("label")).toEqual("Primary");

    expect(primarySpy).toHaveBeenCalled();
    expect(secondarySpy).toHaveBeenCalled();
  });
});
