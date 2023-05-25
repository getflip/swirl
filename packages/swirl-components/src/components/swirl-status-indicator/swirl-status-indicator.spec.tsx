import { newSpecPage } from "@stencil/core/testing";

import { SwirlStatusIndicator } from "./swirl-status-indicator";

describe("swirl-status-indicator", () => {
  it("renders with label", async () => {
    const page = await newSpecPage({
      components: [SwirlStatusIndicator],
      html: `<swirl-status-indicator intent="success" label="Label"></swirl-status-indicator>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-status-indicator intent="success" label="Label">
        <mock:shadow-root>
          <div class="status-indicator status-indicator--intent-success">
            <span class="status-indicator__dot"></span>
            <span class="status-indicator__label">
              Label
            </span>
          </div>
        </mock:shadow-root>
      </swirl-status-indicator>
    `);
  });
});
