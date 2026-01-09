import { newSpecPage } from "@stencil/core/testing";

import { SwirlButton } from "../swirl-button/swirl-button";
import { SwirlPopoverTrigger } from "./swirl-popover-trigger";

(global as any).IntersectionObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
};

describe("swirl-popover-trigger", () => {
  it("renders its trigger element and adds aria attributes", async () => {
    const page = await newSpecPage({
      components: [SwirlPopoverTrigger, SwirlButton],
      html: `
        <swirl-popover id="popover"></swirl-popover>
        <swirl-popover-trigger swirl-popover="popover">
          <swirl-button label="trigger"></swirl-button>
        </swirl-popover-trigger>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-popover-trigger swirl-popover="popover">
        <swirl-button label="trigger" swirl-aria-controls="popover" swirl-aria-expanded="false" swirl-aria-haspopup="dialog">
          <button aria-controls="popover" aria-expanded="false" aria-haspopup="dialog" class="button button--icon-position-start button--intent-default button--size-m button--text-align-center button--variant-ghost" type="button">
            <span class="button__icon"></span>
            <span class="button__label">
              trigger
            </span>
          </button>
        </swirl-button>
      </swirl-popover-trigger>
    `);
  });

  it("renders its trigger element and adds aria attributes when triggered via hover", async () => {
    const page = await newSpecPage({
      components: [SwirlPopoverTrigger, SwirlButton],
      html: `
        <swirl-popover id="popover"></swirl-popover>
        <swirl-popover-trigger swirl-popover="popover" trigger-on-hover="true">
          <swirl-button label="trigger"></swirl-button>
        </swirl-popover-trigger>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-popover-trigger swirl-popover="popover" trigger-on-hover="true">
        <swirl-button label="trigger" swirl-aria-haspopup="dialog">
          <button aria-haspopup="dialog" class="button button--icon-position-start button--intent-default button--size-m button--text-align-center button--variant-ghost" type="button">
            <span class="button__icon"></span>
            <span class="button__label">
              trigger
            </span>
          </button>
        </swirl-button>
      </swirl-popover-trigger>
    `);
  });
});
