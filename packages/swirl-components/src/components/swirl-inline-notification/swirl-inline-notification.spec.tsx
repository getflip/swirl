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
          <div aria-describedby="content" class="inline-notification inline-notification--intent-info" role="status" tabindex="0">
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
          <div aria-describedby="content" class="inline-notification inline-notification--intent-critical" role="status" tabindex="0">
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
});
