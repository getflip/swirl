import { newSpecPage } from "@stencil/core/testing";

import { SwirlBanner } from "./swirl-banner";

describe("swirl-banner", () => {
  it("renders with content, intent, icon and controls", async () => {
    const page = await newSpecPage({
      components: [SwirlBanner],
      html: `<swirl-banner action-label="Action" content="Content" dismissable="true" intent="info" show-icon="true"></swirl-banner>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-banner action-label="Action" content="Content" dismissable="true" intent="info" show-icon="true">
        <mock:shadow-root>
          <div aria-describedby="content" class="banner banner--has-icon banner--intent-info banner--size-m" role="status" tabindex="0">
            <span aria-hidden="true" class="banner__icon">
              <swirl-icon-info size="24"></swirl-icon-info>
            </span>
            <span class="banner__content" id="content" part="banner__content">Content</span>
            <span class="banner__controls">
              <button class="banner__action-button" part="banner__action-button" type="button">
                Action
              </button>
              <button aria-label="Dismiss" class="banner__dismiss-button" part="banner__dismiss-button" type="button">
                <swirl-icon-close size="24"></swirl-icon-close>
              </button>
            </span>
          </div>
        </mock:shadow-root>
      </swirl-banner>
    `);
  });

  it("fires custom action event", async () => {
    const page = await newSpecPage({
      components: [SwirlBanner],
      html: `<swirl-banner action-label="Action" content="Content"></swirl-banner>`,
    });

    const buttonSpy = jest.fn();

    page.root.addEventListener("action", buttonSpy);
    page.root.shadowRoot
      .querySelector<HTMLButtonElement>(".banner__action-button")
      .click();

    await page.waitForChanges();

    expect(buttonSpy).toHaveBeenCalled();
  });

  it("fires custom dismiss event", async () => {
    const page = await newSpecPage({
      components: [SwirlBanner],
      html: `<swirl-banner content="Content" dismissable="true"></swirl-banner>`,
    });

    const buttonSpy = jest.fn();

    page.root.addEventListener("dismiss", buttonSpy);
    page.root.shadowRoot
      .querySelector<HTMLButtonElement>(".banner__dismiss-button")
      .click();

    await page.waitForChanges();

    expect(buttonSpy).toHaveBeenCalled();
  });

  it("renders with custom icon, when icon prop is set", async () => {
    const page = await newSpecPage({
      components: [SwirlBanner],
      html: `<swirl-banner action-label="Action" content="Content" dismissable="true" intent="info" icon="<swirl-icon-download></swirl-icon-download>"></swirl-banner>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-banner action-label="Action" content="Content" dismissable="true" intent="info" icon="<swirl-icon-download></swirl-icon-download>">
        <mock:shadow-root>
          <div aria-describedby="content" class="banner banner--has-icon banner--intent-info banner--size-m" role="status" tabindex="0">
            <span aria-hidden="true" class="banner__icon">
              <swirl-icon-download size="24"></swirl-icon-download>
            </span>
            <span class="banner__content" id="content" part="banner__content">Content</span>
            <span class="banner__controls">
              <button class="banner__action-button" part="banner__action-button" type="button">
                Action
              </button>
              <button aria-label="Dismiss" class="banner__dismiss-button" part="banner__dismiss-button" type="button">
                <swirl-icon-close size="24"></swirl-icon-close>
              </button>
            </span>
          </div>
        </mock:shadow-root>
      </swirl-banner>
    `);
  });
});
