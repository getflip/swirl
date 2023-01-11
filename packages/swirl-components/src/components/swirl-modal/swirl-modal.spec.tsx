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
        <mock:shadow-root>
          <section aria-hidden="true" aria-label="Dialog" aria-modal="true" class="modal" id="modal" role="dialog" tabindex="-1">
            <div class="modal__backdrop"></div>
            <div class="modal__body" role="document">
              <swirl-button class="modal__close-button" hidelabel="" icon="<swirl-icon-close></swirl-icon-close>" label="Close modal"></swirl-button>
              <header class="modal__header">
                <swirl-heading as="h2" class="modal__heading" level="3" text="Dialog"></swirl-heading>
              </header>
              <div class="modal__content">
                <slot></slot>
              </div>
              <footer class="modal__controls">
                <swirl-button-group wrap=""></swirl-button-group>
              </footer>
            </div>
          </section>
        </mock:shadow-root>
        Content
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

    const buttons =
      page.root.shadowRoot.querySelectorAll<HTMLSwirlButtonElement>(
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
