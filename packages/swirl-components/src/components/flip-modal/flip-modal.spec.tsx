import { newSpecPage } from "@stencil/core/testing";

import { FlipModal } from "./flip-modal";

describe("flip-modal", () => {
  it("renders content and heading", async () => {
    const page = await newSpecPage({
      components: [FlipModal],
      html: `<flip-modal label="Dialog">Content</flip-modal>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-modal label="Dialog">
        <mock:shadow-root>
          <section aria-hidden="true" aria-label="Dialog" aria-modal="true" class="modal" id="modal" role="dialog" tabindex="-1">
            <div class="modal__backdrop"></div>
            <div class="modal__body" role="document">
              <flip-button class="modal__close-button" hidelabel="" icon="<flip-icon-close></flip-icon-close>" label="Close modal"></flip-button>
              <header class="modal__header">
                <flip-heading as="h2" class="modal__heading" level="3" text="Dialog"></flip-heading>
              </header>
              <div class="modal__content">
                <slot></slot>
              </div>
              <footer class="modal__controls">
                <flip-button-group wrap=""></flip-button-group>
              </footer>
            </div>
          </section>
        </mock:shadow-root>
        Content
      </flip-modal>
    `);
  });

  it("renders controls and fires events", async () => {
    const page = await newSpecPage({
      components: [FlipModal],
      html: `<flip-modal label="Dialog" primary-action-label="Primary" secondary-action-label="Secondary">Content</flip-modal>`,
    });

    const primarySpy = jest.fn();
    const secondarySpy = jest.fn();

    const buttons =
      page.root.shadowRoot.querySelectorAll<HTMLFlipButtonElement>(
        ".modal__controls flip-button"
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
