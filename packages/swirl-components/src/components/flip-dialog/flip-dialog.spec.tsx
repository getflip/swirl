import { newSpecPage } from "@stencil/core/testing";

import { FlipDialog } from "./flip-dialog";

describe("flip-dialog", () => {
  it("renders content and heading", async () => {
    const page = await newSpecPage({
      components: [FlipDialog],
      html: `<flip-dialog label="Dialog">Content</flip-dialog>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-dialog label="Dialog">
        <mock:shadow-root>
          <div aria-describedby="content" aria-hidden="true" aria-labelledby="label" aria-modal="true" class="dialog" role="alertdialog" tabindex="-1">
            <div class="dialog__backdrop" data-a11y-dialog-hide></div>
            <div class="dialog__body" role="document">
              <h2 class="dialog__heading" id="label">
                Dialog
              </h2>
              <div class="dialog__content" id="content">
                <slot></slot>
              </div>
              <flip-button-group class="dialog__controls" stretch="" wrap=""></flip-button-group>
            </div>
          </div>
        </mock:shadow-root>
        Content
      </flip-dialog>
    `);
  });

  it("can hide the label", async () => {
    const page = await newSpecPage({
      components: [FlipDialog],
      html: `<flip-dialog hide-label label="Dialog">Content</flip-dialog>`,
    });

    expect(page.root.shadowRoot.querySelector("h2")).toBeNull();

    expect(
      page.root.shadowRoot.querySelector(".dialog").getAttribute("aria-label")
    ).toBe("Dialog");
  });

  it("renders controls and fires events", async () => {
    const page = await newSpecPage({
      components: [FlipDialog],
      html: `<flip-dialog label="Dialog" primary-action-label="Primary" secondary-action-label="Secondary">Content</flip-dialog>`,
    });

    const primarySpy = jest.fn();
    const secondarySpy = jest.fn();

    const buttons = page.root.shadowRoot.querySelectorAll("flip-button");

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
