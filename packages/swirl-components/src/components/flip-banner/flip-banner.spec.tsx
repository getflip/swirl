import { newSpecPage } from "@stencil/core/testing";

import { FlipBanner } from "./flip-banner";

describe("flip-banner", () => {
  it("renders with content, intent, icon and controls", async () => {
    const page = await newSpecPage({
      components: [FlipBanner],
      html: `<flip-banner action-label="Action" content="Content" dismissable="true" intent="info" show-icon="true"></flip-banner>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-banner action-label="Action" content="Content" dismissable="true" intent="info" show-icon="true">
        <mock:shadow-root>
          <div aria-describedby="content" class="banner banner--has-icon banner--intent-info" role="status" tabindex="0">
            <span aria-hidden="true" class="banner__icon">
              <flip-icon-info size="24"></flip-icon-info>
            </span>
            <span class="banner__content" id="content">Content</span>
            <span class="banner__controls">
              <button class="banner__action-button" type="button">
                Action
              </button>
              <button aria-label="Dismiss" class="banner__dismiss-button" type="button">
                <flip-icon-close size="24"></flip-icon-close>
              </button>
            </span>
          </div>
        </mock:shadow-root>
      </flip-banner>
    `);
  });

  it("fires custom action event", async () => {
    const page = await newSpecPage({
      components: [FlipBanner],
      html: `<flip-banner action-label="Action" content="Content"></flip-banner>`,
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
      components: [FlipBanner],
      html: `<flip-banner content="Content" dismissable="true"></flip-banner>`,
    });

    const buttonSpy = jest.fn();

    page.root.addEventListener("dismiss", buttonSpy);
    page.root.shadowRoot
      .querySelector<HTMLButtonElement>(".banner__dismiss-button")
      .click();

    await page.waitForChanges();

    expect(buttonSpy).toHaveBeenCalled();
  });
});
