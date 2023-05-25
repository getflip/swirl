import { newSpecPage } from "@stencil/core/testing";

import { SwirlInlineStatus } from "./swirl-inline-status";

describe("swirl-inline-error", () => {
  it("displays the status message and icon", async () => {
    const page = await newSpecPage({
      components: [SwirlInlineStatus],
      html: `<swirl-inline-status icon="<swirl-icon-info></swirl-icon-info>" intent="info" message="The status message." size="m"></swirl-inline-status>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-inline-status icon="<swirl-icon-info></swirl-icon-info>" intent="info" message="The status message." size="m">
        <mock:shadow-root>
          <span class="inline-status inline-status--intent-info inline-status--size-m" part="inline-status">
            <span class="inline-status__icon">
              <swirl-icon-info size="24"></swirl-icon-info>
            </span>
            <span class="inline-status__message">
              The status message.
            </span>
          </span>
        </mock:shadow-root>
      </swirl-inline-status>
    `);
  });
});
