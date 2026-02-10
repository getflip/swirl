import { newSpecPage } from "@stencil/core/testing";

import { SwirlInlineNotification } from "./swirl-inline-notification";

describe("swirl-inline-notification", () => {
  it("renders with heading and content", async () => {
    const page = await newSpecPage({
      components: [SwirlInlineNotification],
      html: `<swirl-inline-notification heading="Heading">Content</swirl-inline-notification>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-inline-notification heading="Heading">
        <mock:shadow-root>
          <div aria-describedby="content" class="inline-notification inline-notification--border-radius-sm inline-notification--intent-info" role="status" tabindex="0">
            <span aria-hidden="true" class="inline-notification__icon">
              <swirl-icon-info size="20"></swirl-icon-info>
            </span>
            <span class="inline-notification__content" id="content">
              <swirl-text class="inline-notification__heading" size="sm" weight="semibold">Heading</swirl-text>
              <slot></slot>
            </span>
          </div>
        </mock:shadow-root>
        Content
      </swirl-inline-notification>
    `);
  });

  it("renders with intent", async () => {
    const page = await newSpecPage({
      components: [SwirlInlineNotification],
      html: `<swirl-inline-notification heading="Heading" intent="critical">Content</swirl-inline-notification>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-inline-notification heading="Heading" intent="critical">
        <mock:shadow-root>
          <div aria-describedby="content" class="inline-notification inline-notification--border-radius-sm inline-notification--intent-critical" role="status" tabindex="0">
            <span aria-hidden="true" class="inline-notification__icon">
              <swirl-icon-error size="20"></swirl-icon-error>
            </span>
            <span class="inline-notification__content" id="content">
              <swirl-text class="inline-notification__heading" size="sm" weight="semibold">Heading</swirl-text>
              <slot></slot>
            </span>
          </div>
        </mock:shadow-root>
        Content
      </swirl-inline-notification>
    `);
  });

  it("renders with border radius xs", async () => {
    const page = await newSpecPage({
      components: [SwirlInlineNotification],
      html: `<swirl-inline-notification heading="Heading" border-radius="xs">Content</swirl-inline-notification>`,
    });

    const element = page.root.shadowRoot.querySelector(".inline-notification");
    expect(
      element.classList.contains("inline-notification--border-radius-xs")
    ).toBe(true);
  });

  it("renders with border radius sm, without border radius prop", async () => {
    const page = await newSpecPage({
      components: [SwirlInlineNotification],
      html: `<swirl-inline-notification heading="Heading">Content</swirl-inline-notification>`,
    });

    const element = page.root.shadowRoot.querySelector(".inline-notification");
    expect(
      element.classList.contains("inline-notification--border-radius-sm")
    ).toBe(true);
  });
});
