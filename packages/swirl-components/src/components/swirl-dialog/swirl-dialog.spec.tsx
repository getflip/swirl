import { newSpecPage } from "@stencil/core/testing";

import { SwirlDialog } from "./swirl-dialog";

describe("swirl-dialog", () => {
  it("renders content and heading", async () => {
    const page = await newSpecPage({
      components: [SwirlDialog],
      html: `<swirl-dialog label="Dialog">Content</swirl-dialog>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-dialog label="Dialog">
        <mock:shadow-root>
          <div aria-describedby="content" aria-hidden="true" aria-labelledby="label" aria-modal="true" class="dialog" role="alertdialog" tabindex="-1">
            <div class="dialog__backdrop"></div>
            <div class="dialog__body" part="dialog__body" role="document">
              <h2 class="dialog__heading" part="dialog__heading" id="label">
                Dialog
              </h2>
              <div class="dialog__content" part="dialog__content" id="content">
                <slot></slot>
              </div>
              <swirl-button-group class="dialog__controls" stretch="" wrap=""></swirl-button-group>
            </div>
          </div>
        </mock:shadow-root>
        Content
      </swirl-dialog>
    `);
  });

  it("can hide the label", async () => {
    const page = await newSpecPage({
      components: [SwirlDialog],
      html: `<swirl-dialog hide-label label="Dialog">Content</swirl-dialog>`,
    });

    expect(page.root.shadowRoot.querySelector("h2")).toBeNull();

    expect(
      page.root.shadowRoot.querySelector(".dialog").getAttribute("aria-label")
    ).toBe("Dialog");
  });

  it("renders controls and fires events", async () => {
    const page = await newSpecPage({
      components: [SwirlDialog],
      html: `<swirl-dialog label="Dialog" primary-action-label="Primary" secondary-action-label="Secondary">Content</swirl-dialog>`,
    });

    const primarySpy = jest.fn();
    const secondarySpy = jest.fn();

    const buttons = page.root.shadowRoot.querySelectorAll("swirl-button");

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
