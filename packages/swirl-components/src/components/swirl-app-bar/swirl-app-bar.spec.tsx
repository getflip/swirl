import { newSpecPage } from "@stencil/core/testing";

import { SwirlAppBar } from "./swirl-app-bar";

(global as any).MutationObserver = class {
  constructor() {}
  disconnect() {}
  observe() {}
};

describe("swirl-app-bar", () => {
  it("renders slots", async () => {
    const page = await newSpecPage({
      components: [SwirlAppBar],
      html: `
        <swirl-app-bar>
        <div slot="cta">CTA</div>
          <swirl-heading slot="heading" text="Heading"></swirl-heading>
          <div slot="center-controls">Center</div>
          <div slot="right-controls">Right</div>
        </swirl-app-bar>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-app-bar>
        <mock:shadow-root>
          <div class="app-bar app-bar--has-cta app-bar--has-heading app-bar--has-right-controls" style="padding-inline-end: var(--s-space-16); padding-inline-start: var(--s-space-16);">
            <div class="app-bar__cta">
              <slot name="cta"></slot>
            </div>
            <div class="app-bar__heading">
              <slot name="heading"></slot>
            </div>
            <div class="app-bar__center-controls">
              <slot name="center-controls"></slot>
            </div>
            <div class="app-bar__right-controls">
              <slot name="right-controls"></slot>
            </div>
          </div>
        </mock:shadow-root>
        <div slot="cta">
          CTA
        </div>
        <swirl-heading slot="heading" text="Heading"></swirl-heading>
        <div slot="center-controls">
          Center
        </div>
        <div slot="right-controls">
          Right
        </div>
      </swirl-app-bar>
    `);
  });

  it("renders stepper controls and fires stepper events", async () => {
    const page = await newSpecPage({
      components: [SwirlAppBar],
      html: `
        <swirl-app-bar show-stepper-controls="true"></swirl-app-bar>
      `,
    });

    const spy = jest.fn();

    page.root.addEventListener("stepUpButtonClick", spy);
    page.root.addEventListener("stepDownButtonClick", spy);

    page.root.shadowRoot
      .querySelector<HTMLElement>('[label="Previous item"]')
      .click();
    page.root.shadowRoot
      .querySelector<HTMLElement>('[label="Next item"]')
      .click();

    expect(spy).toHaveBeenCalledTimes(2);

    expect(page.root).toEqualHtml(`
      <swirl-app-bar show-stepper-controls="true">
        <mock:shadow-root>
          <div class="app-bar" style="padding-inline-end: var(--s-space-16); padding-inline-start: var(--s-space-16);">
            <div class="app-bar__left-controls">
              <div class="app-bar__stepper-controls">
                <swirl-button hidelabel="" icon="<swirl-icon-arrow-upward></swirl-icon-arrow-upward>" label="Previous item"></swirl-button>
                <swirl-button hidelabel="" icon="<swirl-icon-arrow-downward></swirl-icon-arrow-downward>" label="Next item"></swirl-button>
              </div>
            </div>
            <div class="app-bar__cta">
              <slot name="cta"></slot>
            </div>
            <div class="app-bar__heading">
              <slot name="heading"></slot>
            </div>
            <div class="app-bar__center-controls">
              <slot name="center-controls"></slot>
            </div>
            <div class="app-bar__right-controls">
              <slot name="right-controls"></slot>
            </div>
          </div>
        </mock:shadow-root>
      </swirl-app-bar>
    `);
  });

  it("renders and fires close button", async () => {
    const page = await newSpecPage({
      components: [SwirlAppBar],
      html: `
        <swirl-app-bar show-close-button="true"></swirl-app-bar>
      `,
    });

    const spy = jest.fn();

    page.root.addEventListener("closeButtonClick", spy);

    page.root.shadowRoot.querySelector<HTMLElement>('[label="Close"]').click();

    expect(spy).toHaveBeenCalledTimes(1);

    expect(page.root).toEqualHtml(`
      <swirl-app-bar show-close-button="true">
        <mock:shadow-root>
          <div class="app-bar" style="padding-inline-end: var(--s-space-16); padding-inline-start: var(--s-space-16);">
            <div class="app-bar__left-controls">
              <div class="app-bar__main-navigation-control">
                <swirl-button hidelabel="" icon="<swirl-icon-close></swirl-icon-close>" label="Close"></swirl-button>
              </div>
            </div>
            <div class="app-bar__cta">
              <slot name="cta"></slot>
            </div>
            <div class="app-bar__heading">
              <slot name="heading"></slot>
            </div>
            <div class="app-bar__center-controls">
              <slot name="center-controls"></slot>
            </div>
            <div class="app-bar__right-controls">
              <slot name="right-controls"></slot>
            </div>
          </div>
        </mock:shadow-root>
      </swirl-app-bar>
    `);
  });
});
