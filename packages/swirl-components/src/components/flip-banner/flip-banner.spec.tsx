import { newSpecPage } from "@stencil/core/testing";

import { FlipBanner } from "./flip-banner";

describe("flip-banner", () => {
  it("renders with heading, body and intent", async () => {
    const page = await newSpecPage({
      components: [FlipBanner],
      html: `<flip-banner heading="Heading" intent="info">Content</flip-banner>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-banner heading="Heading" intent="info">
        <mock:shadow-root>
          <div aria-describedby="body" class="banner banner--has-body banner--intent-info" role="status" tabindex="0">
            <span class="banner__top">
              <span class="banner__heading" id="heading">
                Heading
              </span>
            </span>
            <span class="banner__body" id="body">
              <slot></slot>
            </span>
          </div>
        </mock:shadow-root>
        Content
      </flip-banner>
    `);
  });

  it("renders with action button", async () => {
    const page = await newSpecPage({
      components: [FlipBanner],
      html: `<flip-banner action-label="Action" heading="Heading"></flip-banner>`,
    });

    expect(page.root.shadowRoot.querySelector("button").innerHTML).toEqual(
      "Action"
    );
  });

  it("fires custom actionClick event", async () => {
    const page = await newSpecPage({
      components: [FlipBanner],
      html: `<flip-banner action-label="Action" heading="Heading"></flip-banner>`,
    });

    const buttonSpy = jest.fn();

    page.root.addEventListener("actionClick", buttonSpy);
    page.root.shadowRoot.querySelector("button").click();

    await page.waitForChanges();

    expect(buttonSpy).toHaveBeenCalled();
  });
});
